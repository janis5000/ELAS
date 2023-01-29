import {Divider, Grid, Paper, TextField, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import React from "react";
import Comments from "./Comments";
import ProfilePicture from "../../../components/ProfilePicture";

function DiscussionMemberTabPanel(props) {
    const {
        discussions,
        value,
        index,
        profile,
        postDiscussion,
        onDiscussionTextChange,
        text,
        discussionIdNewCommentText,
        onCommentTextChange,
        postComment,
        showAllComments,
        hideAllComments,
        onClickProfileImage
    } = props;

    const getTime = (textObjectCreation) => {
        let timeDelta = Date.now() - Date.parse(textObjectCreation);
        if (timeDelta < 1000 * 60) {
            return (
                <Typography style={{color: "gray", fontWeight: 100, fontSize: 12 }}>
                    {Math.round(timeDelta / 1000) + "seconds ago"}
                </Typography>
            );
        } else if (timeDelta < 1000 * 60 * 60) {
            return (
                <Typography style={{color: "gray", fontWeight: 100, fontSize: 12}}>
                    {Math.round(timeDelta / (1000 * 60)) + "minutes ago"}
                </Typography>
            );
        } else if (timeDelta < 1000 * 60 * 60 * 24) {
            return (
                <Typography style={{color: "gray", fontWeight: 100, fontSize: 12}}>
                    {Math.round(timeDelta / (1000 * 60 * 60)) + "hours ago"}
                </Typography>
            );
        } else if (timeDelta > 1000 * 60 * 60 * 24) {
            return (
                <Typography style={{color: "gray", fontWeight: 100, fontSize: 12}}>
                    {Math.round(timeDelta / (1000 * 60 * 60 * 24)) + "days ago"}
                </Typography>
            );
        }
    };

    return (
        <div role="tabpanel">
            {value === index && index === 0 && (
                <Paper style={{overflow: "auto"}}>
                    <Grid container style={{padding: "1.4vw"}}>
                        <Grid item xs={3}>
                            <Typography>Discussion</Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        justify="flex-start"
                        style={{padding: "0 1.6vw 1.4vw 1.4vw"}}
                    >
                        <Grid item style={{paddingRight: "1vw"}}>
                            <ProfilePicture profile_image={profile?.profile_image}
                                            profile_firstname={profile?.firstname}
                                            profile_lastname={profile?.lastname}
                                            defaultAvatarVariant={"h6"} onClickAvatar={null}/>

                        </Grid>
                        <Grid item xs={9}>
                            <form noValidate autoComplete="off">
                                <TextField
                                    id="outlined-basic"
                                    label="Post a message"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    onChange={onDiscussionTextChange}
                                    value={text}
                                />
                            </form>
                        </Grid>
                        <Grid item>
                            <Button
                                color="primary"
                                variant="contained"
                                style={{
                                    marginLeft: 10,
                                    backgroundColor: "#FF6500",
                                    color: "white",
                                }}
                                onClick={() => postDiscussion()}
                            >
                                <SendIcon/>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container style={{maxHeight: 500}}>
                        {discussions.map((x) => (
                            <Grid item xs={12} style={{paddingTop: "1vw"}}>
                                <Box border={1}>
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
                                                x?.discussion_author?.discussion_author_profile_image}
                                                            profile_firstname={x?.discussion_author?.discussion_author_firstname}
                                                            profile_lastname={x?.discussion_author?.discussion_author_lastname}
                                                            defaultAvatarVariant={"h6"}
                                                            onClickAvatar={() => onClickProfileImage(x?.discussion_author?.discussion_author_id)}/>
                                        </Grid>
                                        <Grid item
                                              style={{
                                                  paddingTop: "1vw",
                                              }}>
                                            <Typography>
                                                <b>{x?.discussion_author?.discussion_author_name}</b>
                                            </Typography>
                                            {getTime(x?.time_created)}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography style={{margin: 10}}>
                                                {x?.discussion_text}
                                            </Typography>
                                            <Divider variant="fullWidth"/>
                                            <>
                                                {x?.comments.length > 2 ? (
                                                    !x?.show_all ? (
                                                        <Button
                                                            onClick={() => showAllComments(x?.discussion_id)}
                                                        >
                                                            Show all {x?.comments.length} comments
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            onClick={() => hideAllComments(x?.discussion_id)}
                                                        >
                                                            Hide comments
                                                        </Button>
                                                    )
                                                ) : (
                                                    ""
                                                )}
                                            </>
                                        </Grid>
                                        <Grid container style={{paddingTop: 10}}>
                                        {!x?.show_all
                                            ? x?.comments
                                                ?.slice(-2)
                                                .map((comment) => (
                                                    <Comments comment={comment} getTime={getTime} onClickProfileImage={onClickProfileImage}/>
                                                ))
                                            : x?.comments?.map((comment) => (
                                                <Comments comment={comment} getTime={getTime} onClickProfileImage={onClickProfileImage}/>
                                            ))}
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        container
                                        justify="flex-start"
                                        style={{padding: "0 1.6vw 1.4vw 1.4vw"}}
                                    >
                                        <Grid item style={{paddingRight: "1vw"}}></Grid>
                                        <Grid item xs={9} style={{paddingTop: "1vw"}}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Post a message"
                                                variant="outlined"
                                                fullWidth
                                                size="small"
                                                onChange={(event) =>
                                                    onCommentTextChange(event, x.discussion_id)
                                                }
                                                value={
                                                    discussionIdNewCommentText.id === x.discussion_id
                                                        ? discussionIdNewCommentText.text
                                                        : ""
                                                }
                                            />
                                        </Grid>
                                        <Grid item style={{paddingTop: "1vw"}}>
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                style={{
                                                    marginLeft: 10,
                                                    backgroundColor: "#FF6500",
                                                    color: "white",
                                                }}
                                                onClick={() => postComment(x.discussion_id)}
                                            >
                                                <SendIcon/>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            )}
        </div>
    );
}

DiscussionMemberTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default DiscussionMemberTabPanel;
