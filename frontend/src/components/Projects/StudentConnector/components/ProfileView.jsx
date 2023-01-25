import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { createAuthConfig } from "../utils/auth";
import { useHistory, useParams } from "react-router-dom";
import Backend from "../../../../assets/functions/Backend";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormDialog from "./FormDialog";
import AvatarCard from "./profileComponents/AvatarCard";
import DescriptionCard from "./profileComponents/DescriptionCard";
import SkillsCard from "./profileComponents/SkillsCard";

const useStyles = makeStyles((theme) => ({
  saveProfile: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "right",
    verticalAlign: "text-bottom",
    marginTop: 5,
  },
}));

const ProfileView = () => {
  const classes = useStyles();

  const [profile, setProfile] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [skillsRemove, setSkillsRemove] = useState([]);

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
    degree_id: "",
    courses: [],
    profile_image: "",
  });

  const [options, setOptions] = useState({
    skills: [],
    degrees: [],
  });


  const [currentSkills, setCurrentSkills] = useState([]);


  const authConfig = createAuthConfig();

  const history = useHistory();
  const params = useParams();


  useEffect(() => {
    let studyProgramsRes = "";
    let currentProfileRes = "";
    Backend.get("/studentconnector/study-programs").then((response) => {
      studyProgramsRes = response.data;
      setOptions({
        ...options,
        degrees: studyProgramsRes,
      });
    });
    Backend.get("/studentconnector/profile", authConfig).then((response) => {
      let profileRes = response.data;
      setProfile(profileRes);
      setCurrentSkills(profileRes.skills)
      if (profileRes.id + "" === params.id) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
      Backend.get("/studentconnector/profile/" + params.id).then((response) => {
        currentProfileRes = response.data;
        setCurrentProfile(currentProfileRes);
        //setInitials(currentProfileRes.firstname.substring(0, 1).toUpperCase() + currentProfileRes.lastname.substring(0, 1).toUpperCase())
      });
      Backend.get("/studentconnector/skills").then((response) => {
        let allSkillsRes = response.data
        allSkillsRes = allSkillsRes.filter(x => !currentProfile.skills.map(y => y.id).includes(x.id))
        setAllSkills(allSkillsRes)
      })
    });
    //getProfileInfoAndSetProfileInfoState()
  }, []);

  const handleSaveProfile = () => {
    Backend.post(
      "/studentconnector/profile/" + params.id,
      {
        skills_add: currentProfile.skills,
        skills_remove: skillsRemove,
        description: currentProfile.description,
        degree_id: currentProfile.degree_id,
        profile_image: currentProfile.profile_image,
      },
      authConfig
    )
      .then((res) => {
        setSuccess(true);
        setSaveOpen(true);
        setErrorMessage("Profile Updated!");
      })
      .catch((err) => {
        setSuccess(false);
        setSaveOpen(true);
        setErrorMessage("An error occured. Profile not updated");
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSaveOpen(false);
  };

  const handleDelete = (element) => {
    let newSkills = []
    debugger;
    setCurrentProfile(prevState => {
          let prevProfile = {...prevState}
          newSkills = prevProfile.skills.filter((e) => e.id !== element.id)
          prevProfile.skills = newSkills
          setCurrentProfile(prevProfile)
          setCurrentSkills(newSkills)
        }
    );
    setSkillsRemove(prevState => {
      prevState.push(element)
      setSkillsRemove(prevState)
    })
  };

  return (
    <Grid container direction="column">
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
            isOwner={isOwner}
            setCurrentProfile={setCurrentProfile}
            skillsRemove={skillsRemove}
            currentSkills={currentSkills}
            setSkillsRemove={setSkillsRemove}
            setCurrentSkills={setCurrentSkills}
            allSkills={allSkills}
            handleDelete={handleDelete}
        />
      </Grid>
      </Grid>
      <Box className={classes.saveProfile}>
        {" "}
        {
          <Button
            color="primary"
            variant="contained"
            onClick={handleSaveProfile}
            style={{
              marginLeft: 10,
              backgroundColor: "#FF6500",
              color: "white",
            }}
          >
            <SaveOutlinedIcon />
            Save
          </Button>
        }
      </Box>
      <Snackbar
        open={saveOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={errorMessage}
        style={{ backgroundColor: success ? "green" : "red" }}
      />
    </Grid>
  );
};

export default ProfileView;