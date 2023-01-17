import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button, Paper, Snackbar, Grid, Chip} from '@material-ui/core';
import Backend from '../../../../assets/functions/Backend';
import { createAuthConfig } from '../utils/auth';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {useHistory, useParams} from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { deepOrange} from '@material-ui/core/colors';
import Autocomplete from "@material-ui/lab/Autocomplete";
import ListItemText from '@material-ui/core/ListItemText';
import DoneIcon from '@material-ui/icons/Done';

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
    width: theme.spacing(7),
    hight: theme.spacing(7),
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],

  },
}));

export default function ProfileEditPage() {
  const classes = useStyles();
  const [profile, setProfile] = useState(null);
  const [Skills, setSkills] = useState('');
  const [Description, setDescription] = useState('');
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [courses, setCourses] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [isOwner, setIsOwner] = useState(null);
  const [initials, setInitials] = useState(null);
  const [studyPrograms, setStudyPrograms] = useState([]);
  const [degree, setDegree] = useState(null);

  const authConfig = createAuthConfig();

  const history = useHistory()
  const params = useParams();

  useEffect(() => {
    let studyProgramsRes = ""
    Backend.get("/studentconnector/study-programs").then((response) => {
      studyProgramsRes = response.data
      setStudyPrograms(studyProgramsRes)
    })
    Backend.get("/studentconnector/profile", authConfig).then((response) => {
      let profileRes = response.data
      setProfile(profileRes)
      if (profileRes.id + '' === params.id){
        setIsOwner(true);
      }
      else{
        setIsOwner(false);
      }
      setDegree(studyProgramsRes.filter(x => x.id === profileRes.degree_id)[0])
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
      setInitials(currentProfileRes.firstname.substring(0, 1).toUpperCase() + currentProfileRes.lastname.substring(0, 1).toUpperCase())
    })
  }
const InitialsAvatar = () => {
  return (
    <Avatar variant="circle" className={classes.avatar}>
      {initials}
    </Avatar>
  );
};
const handleDelete = () => {
    ;
  };
  const handleSaveProfile = () => {
    Backend.post('/studentconnector/profile/' + params.id,{
      "skills": Skills.split(" "),
      "description": Description,
      "degree_id": degree.id
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
           <InitialsAvatar className={classes.avatar}/>

           <ListItemText


             primary={'Welcome ' + ' ' + currentProfile?.firstname + ' ' + currentProfile?.lastname} color="primary"
           />




          <form className={classes.root} noValidate autoComplete="off">


            <div>Skills: {currentProfile?.skills.map(x => (
                <Chip
                clickable
                color="primary"
                onClick={handleClick}

                onDelete={handleDelete}
                deleteIcon={<DoneIcon />}color="primary"
                label={x} key={x.id}>

                </Chip>
            ))}
            </div>
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
            <Paper>
              <Autocomplete
                  id="studyprogram"
                  options={studyPrograms}
                  getOptionLabel={(option) => option.name}
                  style={{ width: 500 }}
                  value={degree}
                  onChange = {
                    (event, newValue) => {
                      setDegree(newValue);
                    }
                  }
                  className={classes.preSelectInput}
                  renderInput={(params) => <TextField {...params} label="Study Program" variant="outlined" />}
              />
            </Paper>
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
            (<><InitialsAvatar className={classes.avatar}/>
              <div>Name: {currentProfile?.firstname + ' ' + currentProfile?.lastname}</div>
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
