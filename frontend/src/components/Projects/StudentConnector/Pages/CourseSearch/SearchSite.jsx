import React, {useEffect, useState} from 'react'
import Backend from "../../../../../assets/functions/Backend";
import {Container, Grid, ListItem, ListItemText, Paper, TextField, Typography} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {muiStyles} from "../../utils/muiStyles";
import {createAuthConfig} from "../../utils/auth";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import CourseResults from "../../components/CourseResults";
import LectureSite from "../Lecture/LectureSite";
import {useHistory} from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import scStyles from "../../utils/studentConnectorStyles";
import CardActions from "@material-ui/core/CardActions";


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
            <Grid container direction="column" justify="flex-start" alignItems="center">
                <Grid item xs={10}>
                    <Paper>
                        <Autocomplete
                            id="studyprogram"
                            options={studyPrograms}
                            getOptionLabel={(option) => option.name}
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
                            getOptionLabel={(option) => option.name}
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
                            <Grid item alignItems="center" xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia className={classes.cardMedia}
                                               image="https://nur-muth.com/wp-content/uploads/2022/02/bluebox-hintergrund-filmlexikon.jpeg"
                                               key={"media" + x.id}>
                                    </CardMedia>
                                    <CardContent className={classes.cardContent}
                                                 key={"content" + x.id}>
                                        <Typography gutterBottom variant="h5">
                                            {x.name}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={RedirectToCourseSite}>View Course</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )}
                    </Grid>
                </Container>
            </Grid>
        </>
    );

}

export default SearchSite;