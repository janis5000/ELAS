import React, {useEffect, useState} from 'react'
import Backend from "../../../../../assets/functions/Backend";
import {Container, Grid, ListItem, ListItemText, Paper, TextField, Typography} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {muiStyles} from "../../utils/muiStyles";
import {createAuthConfig} from "../../utils/auth";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import LectureSite from "../Lecture/LectureSite";
import {useHistory} from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import scStyles from "../../utils/studentConnectorStyles";
import CardActions from "@material-ui/core/CardActions";
import LectureCard from "../../components/LectureCard";
import Sidebar from "../Sidebar/Sidebar";


const SearchSite = () => {
    const [degree, setDegree] = useState({});
    //const [degreeId, setDegreeId] = useState(0);
    const [studyPrograms, setStudyPrograms] = useState([]);
    const [lectures, setLectures] = useState([]);
    const [selectedLecture, setSelectedLecture] = useState([]);
    const [profile, setProfile] = useState(null);
    const [resultLectures, setResultLectures] = useState([]);


    const authConfig = createAuthConfig()

    useEffect(() => {
        Backend.get("/studentconnector/study-programs").then((response) => {
            let studyProgramsRes = response.data
            setStudyPrograms(studyProgramsRes)
            Backend.get("/studentconnector/profile", authConfig).then((response) => {
                let profileRes = response.data
                setProfile(profileRes)
                let filteredDegree = studyProgramsRes.filter(x => x.id === profileRes.degree_id)
                if (filteredDegree.length > 0) {
                    let tempDegree = studyProgramsRes.filter(x => x.id === profileRes.degree_id)[0]
                    setDegree(tempDegree)
                    Backend.get("/studentconnector/lectures?studyprogram-id=" + tempDegree.id).then((response) => {
                        let res = response.data
                        setLectures(res)
                    })
                }
            })
        });
    }, [])

    /*useEffect(() => {
        setDegree(studyPrograms.filter(x => x.id === Profile?.Profile?.degree_id)[0])
    }, [studyPrograms])*/

    /*if (Profile != null && Profile.Profile != null && Profile.Profile.degree != null){
    }*/

    const GetCourses = () => {
        Backend.get("/studentconnector/lecture/" + selectedLecture['id']).then((response) => {
            let lecture = response.data
            setResultLectures(lecture);
        })
    }

    const RedirectToCourseSite = () => {
        let path = "/studentconnector/lecture/" + selectedLecture['id'];
        history.push(path);
    }

    const history = useHistory();

    useEffect(() => {
        console.log("RESULTS:", resultLectures)
    }, [resultLectures])

    const classes = scStyles();
    return (
        <>
            <Sidebar />
            <Grid container direction="column" justify="flex-start" alignItems="center">
                <Grid item xs={10}>
                    <Paper>
                        <Autocomplete
                            id="studyprogram"
                            options={studyPrograms}
                            getOptionLabel={(option) => option.name || ''}
                            getOptionSelected={(option, value) => option.name === value.name || true}
                            value={degree}
                            style={{width: 500}}
                            onChange={
                                (event, newValue) => {
                                    setDegree(newValue);
                                    Backend.get("/studentconnector/lectures?studyprogram-id=" + newValue.id).then((response) => {
                                        let res = response.data
                                        setLectures(res)
                                    })
                                }
                            }
                            className={classes.preSelectInput}
                            renderInput={(params) => <TextField {...params} label="Study Program" variant="outlined"/>}
                        />
                    </Paper>
                </Grid>

                <Grid item xs={10}>
                    <Paper>
                        <Autocomplete
                            id="courses"
                            options={lectures}
                            getOptionLabel={(option) => option.name || ''}
                            getOptionSelected={(option, value) => option.name === value.name || true}
                            style={{width: 500}}
                            onChange={
                                (event, newValue) => {
                                    setSelectedLecture(newValue)
                                    console.log("SELECT", selectedLecture);
                                }
                            }
                            className={classes.preSelectInput}
                            renderInput={(params) => <TextField {...params} label="Courses" variant="outlined"/>}
                        />
                    </Paper>
                </Grid>
                <Button variant="contained" color="primary" disableElevation onClick={GetCourses}>Search</Button>
                <Container className={classes.cardContainer}>
                    <Grid className={classes.cardGrid} container spacing={4}>
                        {resultLectures?.map(x =>
                            <Grid item xs={6} md={3} lg={3}>
                            <LectureCard hasAction={true} actionOnClick={RedirectToCourseSite} classesSc={classes}
                                         lectureInfo={x} contentKey={"content" + x.id} mediaKey={"media" + x.id} lectureMember={x.members} hasMember={true}/>
                            </Grid>)}
                    </Grid>
                </Container>
            </Grid>
        </>
    );

}

export default SearchSite;