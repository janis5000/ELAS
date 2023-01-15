import React, {useEffect, useState} from 'react'
import Backend from "../../../../assets/functions/Backend";
import {Grid, ListItem, ListItemText, Paper, TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {muiStyles} from "../utils/muiStyles";
import {createAuthConfig} from "../utils/auth";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import CourseResults from "./CourseResults";
import LectureSite from "./LectureSite";
import {useHistory} from "react-router-dom";

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
                setDegree(studyProgramsRes.filter(x => x.id === profileRes.degree_id)[0])
            })
        });
    }, [])

    /*useEffect(() => {
        setDegree(studyPrograms.filter(x => x.id === Profile?.Profile?.degree_id)[0])
    }, [studyPrograms])*/

    /*if (Profile != null && Profile.Profile != null && Profile.Profile.degree != null){
    }*/

    const GetCourses = () => {
        Backend.get("studentconnector/lecture/" + selectedLecture['id']).then((response) => {
            let lecture = response.data
            setResultLectures(lecture);
        })
    }

    const RedirectToCourseSite = () => {
        let path = "/studentconnector/lecture/" + selectedLecture['id'];
        history.push(path);
    }

    const history = useHistory();

    useEffect(() => {console.log("RESULTS:",resultLectures)}, [resultLectures])

    const classes = muiStyles()
    return (
        <>
            <Grid container direction="column" justify="flex-start" alignItems="center">
                <Grid item xs={10}>
                    <Autocomplete
                        id="studyprogram"
                        options={studyPrograms}
                        getOptionLabel={(option) => option.name}
                        style={{ width: 500 }}
                        onChange = {
                            (event, newValue) => {
                                setDegree(newValue);
                                Backend.get("/studentconnector/lectures?studyprogram-id=" + newValue.id).then((response) => {
                                    let res = response.data
                                    setLectures(res)
                                })
                            }
                        }
                        className={classes.preSelectInput}
                        renderInput={(params) => <TextField {...params} label="Study Program" variant="outlined" />}
                    />
                </Grid>

                <Grid item xs={10}>
                    <Autocomplete
                    id="courses"
                    options={lectures}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 500 }}
                    onChange = {
                        (event, newValue) => {
                            setDegree(newValue);
                            setSelectedLecture(newValue)
                            console.log("SELECT", selectedLecture);
                        }
                    }
                    className={classes.preSelectInput}
                    renderInput={(params) => <TextField {...params} label="Courses" variant="outlined" />}
                />
                </Grid>
                <Button variant="contained" color="primary" disableElevation onClick={GetCourses}>Search</Button>
                <List component="nav" aria-label="secondary mailbox folders">
                    {resultLectures?.map(x =>
                        <ListItem button onClick={RedirectToCourseSite} key={x.id} >
                            <ListItemText primary={x.name} />
                        </ListItem>
                    )}
                </List>
            </Grid>
        </>
    );

}

export default SearchSite;