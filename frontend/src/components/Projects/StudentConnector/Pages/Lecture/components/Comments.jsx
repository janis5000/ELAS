import {Divider, Grid, Paper, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import ProfilePicture from "../../../components/ProfilePicture";

const Comments = ({comment, getTime, onClickProfileImage}) => {
    return (
        <Grid container style={{justifyContent: "center"}}>
            <Paper style={{width: '90%', backgroundColor: '#f0f0f0'}}>

                <Grid container>
                    <Grid
                        item
                        style={{
                            paddingRight: "1vw",
                            paddingLeft: "1vw",
                            paddingTop: "1vw",
                        }}
                    >
                        <ProfilePicture profile_image={
                            comment?.comment_author?.comment_author_profile_image}
                                        profile_firstname={comment?.comment_author?.comment_author_firstname}
                                        profile_lastname={comment?.comment_author?.comment_author_lastname}
                                        defaultAvatarVariant={"h6"}
                                        onClickAvatar={() => onClickProfileImage(comment?.comment_author?.comment_author_id)}/>
                    </Grid>
                    <Grid item
                          style={{
                              paddingTop: "1vw",
                          }}>
                        <Typography>
                            <b>{comment?.comment_author?.comment_author_name}</b>
                        </Typography>
                        {getTime(comment?.time_created)}
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography style={{margin: 10}}>
                            {comment?.comment_text}
                        </Typography>
                        <Divider variant="fullWidth"/>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default Comments;