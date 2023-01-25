import React, {useEffect, useState} from 'react'
import {Chip, Grid, TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const SkillsCard = ({currentProfile, setCurrentProfile, skillsRemove, currentSkills, setSkillsRemove, setCurrentSkills, allSkills}) => {


    const handleDelete = (element) => {
        let newSkills = []
        setCurrentProfile(prevState => {
                let prevProfile = {...prevState}
                newSkills = prevProfile.skills.filter((e) => e !== element)
                prevProfile.skills = newSkills
                setCurrentProfile(prevProfile)
            }
        );
        setSkillsRemove(prevState => {
            prevState.push(element)
            setSkillsRemove(prevState)
        })
    };
    return(
        <div>Skills: {currentProfile?.skills.map(x => (
            <Chip
                clickable
                color="primary"
                onClick={() => handleDelete(x)}

                deleteIcon={<DoneIcon/>}
                color="primary"
                label={x} key={x.id}>

            </Chip>
        ))}
            <Grid item className={classes.center}>
                <Autocomplete
                    id="studyprogram"
                    options={allSkills?.skill_name}
                    style={{width: 300}}
                    value={allSkills?.skill_name}
                    onChange={
                        (event, newValue) => {
                            setCurrentProfile({
                                ...currentProfile,
                                "skills": newValue.Split(" "),
                            });
                        }
                    }
                    className={classes.preSelectInput}
                    renderInput={(params) => <TextField {...params} label="Study Program" variant="outlined"
                                                        size="small"/>}
                />
            </Grid>
        </div>
        )
}

export default SkillsCard;