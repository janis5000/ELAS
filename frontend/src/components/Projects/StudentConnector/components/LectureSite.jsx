import React, {useEffect, useState} from "react";
import Backend from "../../../../assets/functions/Backend";
import {useHistory, useParams} from "react-router-dom";
import {createAuthConfig, createPostAuthConfig} from "../utils/auth";
import Button from "@material-ui/core/Button";
import {Grid} from "@material-ui/core";
import {blue} from "@material-ui/core/colors";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";

const LectureSite = () => {

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
        Backend.get("/studentconnector/other-users/" + params.id).then((response) => {
            let users = response.data
            setOtherUsers(users)
            console.log(users)
        })
    }, [])

    const addCourseToProfile = () => {
        Backend.post("/studentconnector/add-course/" + params.id, {}, authConfig).then((response) => {
            console.log(response.data)
            setProfile(prevState => {
                let prevProfile = {...prevState};
                prevProfile.courses.push(lectureInfo)
                setProfile(prevProfile)
            })
        })
    }

    const removeCourseFromProfile = () => {
        Backend.post("/studentconnector/remove-course/" + params.id, {}, authConfig).then((response) => {
            console.log(response.data)
            setProfile(prevState => {
                let prevProfile = {...prevState};
                prevProfile = prevProfile.courses.filter(x => x['id'] !== params.id)
                setProfile(prevProfile)
            })
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
                {lectureInfo ? (
                    <>
                        <h1>{lectureInfo['name']}</h1>
                        {lectureInfo['description']}
                    </>
                ) : "loading..."}
                {profile && !profileHasCourse() ? (<Button onClick={addCourseToProfile}>Add Course</Button>) : <></>}
                {profile && profileHasCourse() ? (
                    <Button onClick={removeCourseFromProfile}>Remove Course</Button>) : <></>}
                {otherUsers && otherUsers.map(x =>
                    <Card>
                        <CardContent onClick={() => redirectToProfile(x.id)}>
                            {x.firstname + ' ' + x.lastname}
                        </CardContent>
                    </Card>
                )}
            </Grid>
        </>
    )
}

export default LectureSite;