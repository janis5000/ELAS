import React, {useContext, useEffect, useState} from "react";
import {
    Container,
    Grid,
    Paper,
    TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import scStyles from "../../styles/scStyles";
import LectureCard from "../../components/LectureCard/LectureCard";
import {
    getLecturesByDegreeId,
    getLecturesByStudyProgramId,
    getStudyPrograms
} from "./utils/requests";
import ProfileContext from "../../utils/auth/ProfileContext";
import {onSelectCourse} from "./utils/utils";

const SearchSite = () => {
        const [degree, setDegree] = useState({});
        const [studyPrograms, setStudyPrograms] = useState([]);
        const [lectures, setLectures] = useState([]);
        const [selectedLecture, setSelectedLecture] = useState([]);
        const [resultLectures, setResultLectures] = useState([]);
        const {profile} = useContext(ProfileContext)

        useEffect(() => {
            getStudyPrograms(setStudyPrograms)
        }, []);

        useEffect(() => {
            let filteredDegree = studyPrograms.filter(
                (x) => x.id === profile.degree_id
            );
            if (filteredDegree.length > 0) {
                let tempDegree = studyPrograms.filter(
                    (x) => x.id === profile.degree_id
                )[0];
                setDegree(tempDegree);
            }
        }, [studyPrograms])

        useEffect(() => {
            getLecturesByDegreeId(degree.id, setLectures)
        }, [degree])

        const RedirectToCourseSite = () => {
            let path = "/studentconnector/lecture/" + selectedLecture["id"];
            history.push(path);
        };

        const history = useHistory();

        const classes = scStyles();
        return (
            <>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Grid item xs={10} style={{paddingTop: 50}}>
                        <Paper>
                            <Autocomplete
                                id="studyprogram"
                                options={studyPrograms}
                                getOptionLabel={(option) => option.name || ""}
                                getOptionSelected={(option, value) =>
                                    option.name === value.name || true
                                }
                                value={degree}
                                style={{width: 500}}
                                onChange={(event, newValue) => {
                                    setDegree(newValue);
                                    getLecturesByStudyProgramId(newValue.id, setLectures)
                                }}
                                className={classes.preSelectInput}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Study Program"
                                        variant="outlined"
                                    />
                                )}
                            />
                        </Paper>
                    </Grid>

                    <Grid item xs={10}>
                        <Paper>
                            <Autocomplete
                                id="courses"
                                options={lectures}
                                getOptionLabel={(option) => option.name || ""}
                                getOptionSelected={(option, value) =>
                                    option.name === value.name || true
                                }
                                style={{width: 500}}
                                onChange={(event, newValue) => {
                                    setSelectedLecture(newValue);
                                    console.log("SELECT", selectedLecture);
                                }}
                                className={classes.preSelectInput}
                                renderInput={(params) => (
                                    <TextField {...params} label="Courses" variant="outlined"/>
                                )}
                            />
                        </Paper>
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        onClick={() => onSelectCourse(selectedLecture["id"], setResultLectures)}
                    >
                        Search
                    </Button>
                    <Container className={classes.cardContainer}>
                        <Grid className={classes.cardGrid} container spacing={4}>
                            {resultLectures?.map((x) => (
                                <Grid item xs={6} md={3} lg={3} key={x.id}>
                                    <LectureCard
                                        hasAction={true}
                                        actionOnClick={RedirectToCourseSite}
                                        classesSc={classes}
                                        lectureInfo={x}
                                        contentKey={"content" + x.id}
                                        mediaKey={"media" + x.id}
                                        actionKey={"action" + x.id}
                                        lectureMember={x.members}
                                        hasMember={true}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Grid>
            </>
        );
    }
;

export default SearchSite;