import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button, Paper, Snackbar, Grid} from '@material-ui/core';
import Backend from '../../../../assets/functions/Backend';
import { createAuthConfig } from '../utils/auth';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {useHistory} from "react-router-dom";

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

  const authConfig = createAuthConfig();

  const history = useHistory()

  useEffect(() => {
    Backend.get("/studentconnector/profile", authConfig).then((response) => {
      let profileRes = response.data
      setProfile(profileRes)
      Backend.get('/studentconnector/profile/' + profileRes.id + '/courses').then((response) => {
        let courseRes = response.data
        setCourses(courseRes)
      })
    })
  }, [])

  const handleSaveProfile = () => {
    /*const urlRegex = new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/);
    if (urlRegex.test(avatarUrl)) {
      setErrorMessage("Invalid Image URL")
      setOpen(true);
      return;
    }*/

    Backend.post('/studentconnector/profile/',{
      Skills: Skills.split(" "),
      Description: Description
    }, authConfig)
    .then((res) => {
      setSuccess(true);
      setOpen(true);
      setErrorMessage("Profile Updated!")
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
        <Paper className={classes.paper}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="Skills"
              label="Skills"
              value={Skills}
              onChange={e => setSkills(e.target.value)}
            />
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
        </Paper>
        {courses && courses.map(x =>
            <Card>
              <CardContent onClick={() => redirectToCourse(x.id)}>
                {x.name}
              </CardContent>
            </Card>
        )}
        </Grid>
  );
}
