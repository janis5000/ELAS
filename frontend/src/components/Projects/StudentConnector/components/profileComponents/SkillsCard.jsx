import React, {useEffect, useState} from 'react'
import {Chip, Grid, makeStyles, TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DoneIcon from "@material-ui/icons/Done";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "block",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(1),
            // width: theme.spacing(30),
            height: theme.spacing(35),
        },
        width: '100%'
    },
    center: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    saveAbout: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "right",
        verticalAlign: "text-bottom",
        marginTop: 15,
    },
    profileDescription: {
        color: "#000000",
        lineHeight: 1.5,
    },
    textarea: {
        backgroundColor: "transparent",
        border: 0,
        borderColor: "#303f9f",
        padding: "8px",
        width: "100%",
    },
}));
const SkillsCard = ({currentProfile, setCurrentProfile, skillsRemove, handleDelete, currentSkills, setSkillsRemove, setCurrentSkills, allSkills}) => {
    const classes = useStyles()

    const [selectedValue, setSelectedValue] = useState("")



    const onChangeSkills = (event, newValue) => {
        debugger;
        setCurrentProfile(prevState => {
            let prevProfile = {...prevState}
            if(newValue !== null && newValue.skill_name !== "" && !prevProfile.skills.includes(newValue)) {
                prevProfile.skills.push(newValue.at(-1))
            }
            setCurrentProfile(prevProfile);
        });
    }

    return(
        <div>Skills: {currentSkills?.map(x => (
            <Chip
                clickable
                color="primary"
                onClick={() => handleDelete(x)}

                deleteIcon={<DoneIcon/>}
                color="primary"
                label={x.skill_name} key={x.id}>

            </Chip>
        ))}
            <Grid item className={classes.center}>
                <Autocomplete
                    multiple
                    id="studyprogram"
                    options={allSkills}
                    getOptionLabel={(option) => option.skill_name}
                    defaultValue={currentProfile?.skills}
                    style={{width: 300}}
                    freeSolo
                    onChange={
                        (event, newValue) => {
                            onChangeSkills(event, newValue)
                        }
                    }
                    className={classes.preSelectInput}
                    renderInput={(params) => <TextField {...params} label="Study Program" variant="standard" placeholder="All skills"
                                                        size="small"/>}
                />
            </Grid>
        </div>
        )
}

export default SkillsCard;