import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button, Paper, Snackbar, Grid} from '@material-ui/core';
import Backend from '../../../../assets/functions/Backend';
import { createAuthConfig } from '../utils/auth';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {useHistory, useParams} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1.5),
      width: '50ch',
    },
  },
  button: {
    margin: theme.spacing(1.5),
  },
  paper: {
    padding: theme.spacing(4),
    margin: 'auto',
    maxWidth: 600,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1.5),
    width: '25ch',
  },
}));

export default function ProfileEditPage() {
  const classes = useStyles();
  const [profile, setProfile] = useState(null);
  const [Skills, setSkills] = useState('');
  const [Description, setDescription] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [courses, setCourses] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [isOwner, setIsOwner] = useState(null);

  const authConfig = createAuthConfig();

  const history = useHistory()
  const params = useParams();

  useEffect(() => {
    Backend.get("/studentconnector/profile", authConfig).then((response) => {
      let profileRes = response.data
      setProfile(profileRes)
      if (profileRes.id + '' === params.id){
        setIsOwner(true);
      }
      else{
        setIsOwner(false);
      }
      Backend.get('/studentconnector/profile/' + profileRes.id + '/courses').then((response) => {
        let courseRes = response.data
        setCourses(courseRes)
      })
    })
    getProfileInfoAndSetProfileInfoState();
  }, [])

  const getProfileInfoAndSetProfileInfoState = () => {
    Backend.get('/studentconnector/profile/' + params.id).then((response) => {
      let currentProfileRes = response.data
      setCurrentProfile(currentProfileRes)
    })
  }

  const handleSaveProfile = () => {
    Backend.post('/studentconnector/profile/' + params.id,{
      "skills": Skills.split(" "),
      "description": Description
    }, authConfig)
    .then((res) => {
      setSuccess(true);
      setOpen(true);
      setErrorMessage("Profile Updated!")
      getProfileInfoAndSetProfileInfoState()
    })
    .catch((err) => {
      setSuccess(false);
      setOpen(true);
      setErrorMessage("An error occured. Profile not updated")
    });
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const redirectToCourse = (id) => {
    let path = "/studentconnector/lecture/" + id;
    history.push(path);
  }
  return (
      <Grid container direction="column" justify="flex-start" alignItems="center">
        {isOwner ? (<Paper className={classes.paper}>
          <div>Name: {currentProfile?.firstname + ' ' + currentProfile?.lastname}</div>
          <form className={classes.root} noValidate autoComplete="off">
            <div>Skills: {currentProfile?.skills.map(x => x + " ")}</div>
            <TextField
              id="Skills"
              label="Skills"
              value={Skills}
              onChange={e => setSkills(e.target.value)}
            />
            <div>Description: {currentProfile?.description}</div>
            <TextField
              id="Description"
              label="Description"
              value={Description}
              onChange={e => setDescription(e.target.value)}
              multiline
              rows={4}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleSaveProfile}
            >
              Save Profile
            </Button>
          </form>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={errorMessage}
            style={{backgroundColor: success ? 'green' : 'red'}}
          />
        </Paper>) :
            (<><div>Name: {currentProfile?.firstname + ' ' + currentProfile?.lastname}</div>
              <div>Skills: {currentProfile?.skills.map(x => x + " ")}</div>
              <div>Description: {currentProfile?.description}</div>
            </>)}
        {courses && courses.map(x =>
            <Card>
              <CardContent onClick={() => redirectToCourse(x.id)} key={x.id}>
                {x.name}
              </CardContent>
            </Card>
        )}
        </Grid>
  );
}
