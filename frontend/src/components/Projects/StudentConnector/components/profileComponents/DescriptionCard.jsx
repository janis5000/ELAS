import {Avatar, Grid, makeStyles, Paper, TextField, Typography} from "@material-ui/core";
import FormDialog from "../FormDialog";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, {useEffect, useState} from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        'display': 'block',
        'flexWrap': 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            // width: theme.spacing(30),
            height: theme.spacing(35),
        },
    },
    large: {
        width: theme.spacing(17),
        height: theme.spacing(17),
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileName: {
        fontWeight: 400,
        fontSize: 22,
        fontFamily: 'Roboto',
        font: 'Roboto',
        color: '#000000',
        lineHeight: 1.5,
    },
}));

const DescriptionCard = ({currentProfile, openImageDialog, setOpenImageDialog, isOwner, setCurrentProfile, options}) => {
    const classes = useStyles()


    const onClickOpenImageDialogOn = () => {
        if (isOwner) {
            setOpenImageDialog(true);
        }
    }

    const handleImageDialog = (newState) => {
        if (isOwner) {
            setOpenImageDialog(newState)
        }
    }

    const handleImageDialogSave = (newCurrentProfileState) => {
        if (isOwner) {
            setCurrentProfile(newCurrentProfileState)
        }
    }

    return (
        <Grid container direction="column">
            <Paper className={classes.root}>
                <div style={{padding: 5}}>
                    <Grid item>
                        <Grid item className={classes.center}>
                            <Avatar
                                alt="profile pic"
                                src={currentProfile?.profile_image}
                                className={classes.large}
                                onClick={onClickOpenImageDialogOn}
                            />
                            <FormDialog open={openImageDialog} handleSaveImage={handleImageDialogSave}
                                        currentProfile={currentProfile} handleDialogStatus={handleImageDialog}/>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.center}>
                        <Typography className={classes.profileName}>
                            {currentProfile?.firstname + ' ' + currentProfile?.lastname}
                        </Typography>
                    </Grid>
                    <Grid item className={classes.center}>
                        <Autocomplete
                            id="studyprogram"
                            options={options?.degrees}
                            getOptionLabel={(option) => option.name}
                            style={{width: 300}}
                            value={currentProfile?.degree}
                            onChange={
                                (event, newValue) => {
                                    setCurrentProfile({
                                        ...currentProfile,
                                        "degree": newValue,
                                        "degree_id": newValue.id
                                    });
                                }
                            }
                            className={classes.preSelectInput}
                            renderInput={(params) => <TextField {...params} label="Study Program" variant="outlined"
                                                                size="small"/>}
                        />
                    </Grid>
                </div>
            </Paper>
        </Grid>
    )
}

export default DescriptionCard;