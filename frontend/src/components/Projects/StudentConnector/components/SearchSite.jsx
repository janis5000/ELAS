import React, {useEffect, useState} from 'react'
import Backend from "../../../../assets/functions/Backend";
import {Grid, Paper, TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {muiStyles} from "../utils/muiStyles";

const SearchSite = (Profile) => {
    const [degree, setDegree] = useState({});
    //const [degreeId, setDegreeId] = useState(0);
    const [studyPrograms, setStudyPrograms] = useState([]);
    const [lectures, setLectures] = useState([]);

    useEffect(() => {
        Backend.get("/studentconnector/study-programs").then((response) => {
            let res = response.data
            setStudyPrograms(res)
            setDegree(res.filter(x => x.id === Profile?.Profile?.degree_id)[0])
        });
    }, [])

    /*useEffect(() => {
        setDegree(studyPrograms.filter(x => x.id === Profile?.Profile?.degree_id)[0])
    }, [studyPrograms])*/

    /*if (Profile != null && Profile.Profile != null && Profile.Profile.degree != null){
    }*/
    const classes = muiStyles()
    return (
        <>
            <Grid container direction="column" justify="flex-start" alignItems="center">
                <Grid item xs={10}>
                    <Autocomplete
                        id="studyprogram"
                        options={studyPrograms}
                        getOptionLabel={(option) => option.name}
                        defaultValue={degree}
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
                        }
                    }
                    className={classes.preSelectInput}
                    renderInput={(params) => <TextField {...params} label="Courses" variant="outlined" />}
                />
                </Grid>
            </Grid>
        </>
    );

}

export default SearchSite;