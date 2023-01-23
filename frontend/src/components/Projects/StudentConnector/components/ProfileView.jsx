import React, {useEffect, useState} from 'react'
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
    Typography
} from "@material-ui/core";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import {createAuthConfig} from "../utils/auth";
import {useHistory, useParams} from "react-router-dom";
import Backend from "../../../../assets/functions/Backend";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormDialog from "./FormDialog";

const useStyles = makeStyles((theme) => ({
    root: {
        'display': 'block',
        'flexWrap': 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            // width: theme.spacing(30),
            height: theme.spacing(35),
        },
    },
    large: {
        width: theme.spacing(17),
        height: theme.spacing(17),
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveProfile: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'right',
        verticalAlign: 'text-bottom',
        marginTop: 5,
    },
    profileName: {
        fontWeight: 400,
        fontSize: 22,
        fontFamily: 'Roboto',
        font: 'Roboto',
        color: '#000000',
        lineHeight: 1.5,
    },
}));

const ProfileView = () => {

    const classes = useStyles()

    const [profile, setProfile] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [openImageDialog, setOpenImageDialog] = useState(false);
    const [saveOpen, setSaveOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [currentProfile, setCurrentProfile] = useState({"id": "",
        "uid": "",
        "email": "",
        "firstname": "",
        "lastname": "",
        "description": "",
        "skills": [],
        "degree": "",
        "degree_id": "",
        "courses": [],
        "profile_image": ""}
    );

    const [options, setOptions] = useState({"skills": [],
        "degrees": []
    })

    const authConfig = createAuthConfig();

    const history = useHistory()
    const params = useParams();

    useEffect(() => {
        let studyProgramsRes = ""
        Backend.get("/studentconnector/study-programs").then((response) => {
            studyProgramsRes = response.data
            setOptions({...options,
            "degrees": studyProgramsRes})
        })
        Backend.get("/studentconnector/profile", authConfig).then((response) => {
            let profileRes = response.data
            setProfile(profileRes)
            if (profileRes.id + '' === params.id) {
                setIsOwner(true);
            } else {
                setIsOwner(false);
            }
            Backend.get('/studentconnector/profile/' + params.id).then((response) => {
                let currentProfileRes = response.data
                setCurrentProfile(currentProfileRes)
                //setInitials(currentProfileRes.firstname.substring(0, 1).toUpperCase() + currentProfileRes.lastname.substring(0, 1).toUpperCase())
            })
        })
        //getProfileInfoAndSetProfileInfoState()
    }, [])

    const handleSaveProfile = () => {
        Backend.post('/studentconnector/profile/' + params.id, {
            "skills_add": [],
            "skills_remove": [],
            "description": currentProfile.description,
            "degree_id": currentProfile.degree_id,
            "profile_image": currentProfile.profile_image
        }, authConfig)
            .then((res) => {
                setSuccess(true);
                setSaveOpen(true);
                setErrorMessage("Profile Updated!")
            })
            .catch((err) => {
                setSuccess(false);
                setSaveOpen(true);
                setErrorMessage("An error occured. Profile not updated")
            });
    }

    const onClickOpenImageDialogOn = () => {
        if(isOwner) {
            setOpenImageDialog(true);
        }
    }

    const handleImageDialog = (newState) => {
        if(isOwner) {
            setOpenImageDialog(newState)
        }
    }

    const handleImageDialogSave = (newCurrentProfileState) => {
        if(isOwner) {
            setCurrentProfile(newCurrentProfileState)
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSaveOpen(false);
    };

    return (
        <>
            <Grid container direction="column">
                <Paper className={classes.root}>
                    <div style={{ padding: 5 }}>
                        <Grid item>
                            <Grid item className={classes.center}>
                                <Avatar
                                    alt="profile pic"
                                    src={currentProfile?.profile_image}
                                    className={classes.large}
                                    onClick={onClickOpenImageDialogOn}
                                />
                                <FormDialog open={openImageDialog} handleSaveImage={handleImageDialogSave} currentProfile={currentProfile} handleDialogStatus={handleImageDialog}/>
                            </Grid>
                        </Grid>
                        <Grid item className={classes.center}>
                            <Typography className={classes.profileName}>
                                {currentProfile?.firstname + ' ' + currentProfile?.lastname}
                            </Typography>
                        </Grid>
                        <Grid item className={classes.center}>
                            <Autocomplete
                                id="studyprogram"
                                options={options.degrees}
                                getOptionLabel={(option) => option.name}
                                style={{width: 500}}
                                value={currentProfile?.degree}
                                onChange={
                                    (event, newValue) => {
                                        setCurrentProfile({...currentProfile, "degree": newValue, "degree_id": newValue.id});
                                    }
                                }
                                className={classes.preSelectInput}
                                renderInput={(params) => <TextField {...params} label="Study Program" variant="outlined" size="small"/>}
                            />
                        </Grid>
                        <Box className={classes.saveProfile}>
                            {' '}
                            {(
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={handleSaveProfile}
                                    style={{
                                        marginLeft: 10,
                                        backgroundColor: '#FF6500',
                                        color: 'white',
                                    }}
                                >
                                    <SaveOutlinedIcon fontSize="small" />
                                </Button>
                            )}
                        </Box>
                    </div>
                    <Snackbar
                        open={saveOpen}
                        autoHideDuration={3000}
                        onClose={handleClose}
                        message={errorMessage}
                        style={{backgroundColor: success ? 'green' : 'red'}}
                    />
                </Paper>
            </Grid>
        </>
    );
}

export default ProfileView;