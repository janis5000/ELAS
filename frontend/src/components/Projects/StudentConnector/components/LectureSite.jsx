import {useEffect, useState} from "react";
import Backend from "../../../../assets/functions/Backend";
import {useParams} from "react-router-dom";
import {createAuthConfig, createPostAuthConfig} from "../utils/auth";
import Button from "@material-ui/core/Button";
import {Grid} from "@material-ui/core";
import {blue} from "@material-ui/core/colors";

const LectureSite = () => {

    const [profile, setProfile] = useState(null);
    const [lectureInfo, setLectureInfo] = useState(null);
    const params = useParams();

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
            </Grid>
        </>
    )
}

export default LectureSite;