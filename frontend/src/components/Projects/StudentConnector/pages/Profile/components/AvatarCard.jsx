import {Grid, Paper, TextField, Typography} from "@material-ui/core";
import FormDialog from "./FormDialog";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from 'react'
import ProfilePicture from "../../../components/ProfilePicture/ProfilePicture";
import {avatarCardStyle} from "../styles/avatarCardStyle";


const AvatarCard = ({currentProfile, openImageDialog, setOpenImageDialog, isOwner, setCurrentProfile, options}) => {
    const classes = avatarCardStyle()


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
                <div>
                    <Grid item>
                        <Grid item className={classes.center}>
                            <ProfilePicture profile_image={currentProfile?.profile_image}
                                            profile_firstname={currentProfile?.firstname}
                                            profile_lastname={currentProfile?.lastname}
                                            avatarClass={classes.large}
                                            defaultAvatarVariant={"h2"} onClickAvatar={onClickOpenImageDialogOn}/>
                            <FormDialog open={openImageDialog} handleSaveImage={handleImageDialogSave}
                                        currentProfile={currentProfile} handleDialogStatus={handleImageDialog}/>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.center}>
                        <Typography className={classes.profileName} variant="h5">
                            {currentProfile?.firstname + ' ' + currentProfile?.lastname}
                        </Typography>
                    </Grid>
                    <Grid item className={classes.center}>
                        <Autocomplete
                            id="studyprogram"
                            options={options?.degrees}
                            getOptionLabel={(option) => option.name || ''}
                            getOptionSelected={(option, value) => option.id === value.id || true}
                            style={{width: "90%"}}
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

export default AvatarCard;