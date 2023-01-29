import React, {useEffect, useState} from 'react'
import Backend from "../../../../../assets/functions/Backend";
import {createAuthConfig} from "../../utils/auth";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Sidebar from "../Sidebar/Sidebar";
import {Container, Grid} from "@material-ui/core";
import LectureCard from "../../components/LectureCard";
import scStyles from "../../utils/studentConnectorStyles";
import {useHistory} from "react-router-dom";

const Dashboard = () => {
    const [profile, setProfile] = useState(null)
    const [lecturesWithMembers, setLecturesWithMembers] = useState(null)
    const authConfig = createAuthConfig()

    useEffect(() => {
        Backend.get("/studentconnector/profile", authConfig).then((response) => {
            let profileRes = response.data
            setProfile(profileRes)
            getLectureMembers(profileRes.courses)
        })
    }, [])

    const getLectureMembers = (profileCourses) => {
        let path = "/studentconnector/lectures-with-member-by-id?"
        profileCourses.forEach(x => path += "id=" + x.id + "&" )
        Backend.get(path).then((response) => {
            let lectureMemberRes = response.data
            setLecturesWithMembers(lectureMemberRes)
        })
    }


    const classes = scStyles();
    const history = useHistory();

    const RedirectToCourseSite = (id) => {
        let path = "/studentconnector/lecture/" + id;
        history.push(path);
    }

    return (
        <>
            <Sidebar />
            {profile?.courses === null || profile?.courses.length === 0 ? "You have no courses selected yet." : (
                <Container className={classes.cardContainer} style={{float: "left"}}>
                <Grid className={classes.cardGrid} container spacing={4}>
                    {lecturesWithMembers?.map(x =>
                        <Grid item xs={6} md={3} lg={3}>
                            <LectureCard hasAction={true} actionOnClick={() => RedirectToCourseSite(x.id)} classesSc={classes}
                                         lectureInfo={x} contentKey={"content" + x.id} mediaKey={"media" + x.id} lectureMember={x.members} hasMember={true}/>
                        </Grid>)}
                </Grid>
            </Container>)}
        </>
    )
}
export default Dashboard;
