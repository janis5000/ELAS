import React, {useEffect, useState} from "react";
import Backend from "../../../../assets/functions/Backend";
import {useHistory, useParams} from "react-router-dom";
import {createAuthConfig, createPostAuthConfig} from "../utils/auth";
import Button from "@material-ui/core/Button";
import {Grid, Paper, Typography} from "@material-ui/core";
import {blue} from "@material-ui/core/colors";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
        margin: theme.spacing(8),


   paper:{

    },
      typography:{
            margin:theme.spacing(1),
          padding:theme.spacing(4),
      }
  },
}));
const LectureSite = () => {
    const classes = useStyles();

    const [profile, setProfile] = useState(null);
    const [lectureInfo, setLectureInfo] = useState(null);
    const [otherUsers, setOtherUsers] = useState(null);
    const params = useParams();

    const history = useHistory();

    const authConfig = createAuthConfig();
    //const postAuthConfig = createPostAuthConfig();
    useEffect(() => {
        Backend.get("/studentconnector/profile", authConfig).then((response) => {
            let profileRes = response.data
            setProfile(profileRes)
        })
        Backend.get("/studentconnector/lecture/" + params.id).then((response) => {
            let lecture = response.data
            setLectureInfo(lecture[0])
            console.log(lecture[0])
        })
        getOtherUsers()
    }, [])

    const getOtherUsers = () => {
        Backend.get("/studentconnector/other-users/" + params.id).then((response) => {
            let users = response.data
            setOtherUsers(users)
            console.log(users)
        })
    }

    const addCourseToProfile = () => {
        Backend.post("/studentconnector/add-course/" + params.id, {}, authConfig).then((response) => {
            console.log(response.data)
            let prevProfile = null;
            setProfile(prevState => {
                prevProfile = {...prevState};
                prevProfile.courses.push(lectureInfo)
                setProfile(prevProfile)
            })
            getOtherUsers()
        })
    }

    const removeCourseFromProfile = () => {
        Backend.post("/studentconnector/remove-course/" + params.id, {}, authConfig).then((response) => {
            console.log(response.data)
            let prevProfile = null;
            setProfile(prevState => {
                prevProfile = {...prevState};
                prevProfile.courses = prevProfile.courses.filter(x => x['id'] !== params.id)
                setProfile(prevProfile)
            })
            getOtherUsers()
        })
    }

    const profileHasCourse = () => {
        let p = profile?.courses?.filter(x => x['id'] === params.id)
        if (p != null) {
            return p.length > 0
        } else {
            return false
        }
    }

    const redirectToProfile = (id) => {
        let path = "/studentconnector/profile/" + id;
        history.push(path);
    }

    return (
        <>
            <Grid container direction="column" justify="flex-start" alignItems="center">
                <Paper className={classes.root} elevation={3}>
                    <Typography className={classes.root} >


                    {lectureInfo ? (
                        <>
                            <h1>{lectureInfo['name']}</h1>
                            {lectureInfo["description"]}

                        </>
                        ) : "loading..."}
                    </Typography>
                    {profile && !profileHasCourse() ? (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={addCourseToProfile}>Add Course</Button>) : <></>}
                    {profile && profileHasCourse() ? (
                        <Button variant="contained"
                                color="primary" onClick={removeCourseFromProfile}>Remove Course</Button>) : <></>}
                    {otherUsers && otherUsers.map(x =>

                        <Card>
                            <CardContent onClick={() => redirectToProfile(x.id)} key={x.id}>
                                {x.firstname + ' ' + x.lastname}
                            </CardContent>
                        </Card>
                    )}
                </Paper>
            </Grid>
        </>
    )
}

export default LectureSite;