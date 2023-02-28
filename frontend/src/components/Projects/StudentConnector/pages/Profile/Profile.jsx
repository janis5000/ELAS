import React, {useContext, useEffect, useState} from "react";
import {
    Box,
    Button,
    Grid,
    Snackbar,
    Typography,
} from "@material-ui/core";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import {useParams} from "react-router-dom";
import AvatarCard from "./components/AvatarCard";
import DescriptionCard from "./components/DescriptionCard";
import SkillsCard from "./components/SkillsCard";
import AuthConfigContext from "../../utils/auth/AuthConfig";
import ProfileContext from "../../utils/auth/ProfileContext";
import {getAllSkillsOfUser, getCurrentProfileById, getStudyPrograms, postProfileData} from "./utils/requests";
import {checkIfOwner} from "./utils/utils";
import {profileStyle} from "./styles/profileStyle";

const Profile = () => {
    const classes = profileStyle();

    const [isOwner, setIsOwner] = useState(false);
    const [openImageDialog, setOpenImageDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [success, setSuccess] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [skillsRemove, setSkillsRemove] = useState([]);

    const {profile,} = useContext(ProfileContext);
    const authConfig = useContext(AuthConfigContext);

    const [allSkills, setAllSkills] = useState({
        id: "",
        skill_name: "",
    });

    const [currentProfile, setCurrentProfile] = useState({
        id: "",
        uid: "",
        email: "",
        firstname: "",
        lastname: "",
        description: "",
        skills: [],
        degree: "",
        degree_id: null,
        courses: [],
        profile_image: "",
    });

    const [options, setOptions] = useState({
        skills: [],
        degrees: [],
    });


    const [currentSkills, setCurrentSkills] = useState([]);

    const params = useParams();

    useEffect(() => {
            checkIfOwner(profile.id, params.id, setIsOwner)
            getStudyPrograms(setOptions)
            getCurrentProfileById(params.id, setCurrentProfile, setCurrentSkills)
        },
        [])

    useEffect(() => {
        getAllSkillsOfUser(setAllSkills, currentProfile)
    }, [currentProfile])

    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <>
            <Grid container direction="column">
                <Typography style={{marginBottom: "2vw"}} variant="h5">My Profile</Typography>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} sm={8} lg={3}>
                        <AvatarCard
                            currentProfile={currentProfile}
                            openImageDialog={openImageDialog}
                            setOpenImageDialog={setOpenImageDialog}
                            isOwner={isOwner}
                            setCurrentProfile={setCurrentProfile}
                            options={options}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} lg={3}>
                        <DescriptionCard
                            currentProfile={currentProfile}
                            isOwner={isOwner}
                            setCurrentProfile={setCurrentProfile}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} lg={3}>
                        <SkillsCard
                            currentProfile={currentProfile}
                            setCurrentProfile={setCurrentProfile}
                            currentSkills={currentSkills}
                            setCurrentSkills={setCurrentSkills}
                            allSkills={allSkills}
                            setSkillsRemove={setSkillsRemove}
                            isOwner={isOwner}
                        />
                    </Grid>
                </Grid>
                <Box className={classes.saveProfile}>
                    {
                        isOwner &&
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => postProfileData(profile.id, {
                                skills_add: currentProfile.skills,
                                skills_remove: skillsRemove,
                                description: currentProfile.description,
                                degree_id: currentProfile.degree_id,
                                profile_image: currentProfile.profile_image
                            }, setSuccess, setOpenSnackbar, setSnackBarMessage, authConfig)}
                            style={{
                                marginLeft: 10,
                                backgroundColor: "#FF6500",
                                color: "white",
                            }}
                        >
                            <SaveOutlinedIcon/>
                            Save
                        </Button>
                    }
                </Box>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                    message={snackBarMessage}
                    style={{backgroundColor: success ? "green" : "red"}}
                />
            </Grid>
        </>
    );
};

export default Profile;