import {Divider, Grid, Paper, Typography} from "@material-ui/core";
import ProfilePicture from "../../../components/ProfilePicture/ProfilePicture";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Comments from "./Comments";
import React, {useEffect, useState} from "react";
import ViewProfileSendMessageButton from "./ViewProfileSendMessageButton";
import {getDiscussionsById} from "../utils/requests";
import {useParams} from "react-router-dom";
import {getTime, hideAllComments, showAllComments} from "../utils/utils";
import StartDiscussion from "./StartDiscussion";
import AddComment from "./AddComment";

const Discussion = ({
                        onClickProfileImage,
                        onSendMessageClick
                    }) => {
    useEffect(() => {
        getDiscussionsById(params.id, setDiscussions)
    }, [])

    const [discussions, setDiscussions] = useState([]);

    const params = useParams();

    const onSetDiscussions = (val) => {
        setDiscussions(val);
    }

    return (
        <Paper style={{overflow: "auto"}}>
            <Grid container style={{padding: "1.4vw"}}>
                <Grid item xs={3}>
                    <Typography>Discussion</Typography>
                </Grid>
            </Grid>
            <StartDiscussion discussion_id={params.id} onSetDiscussion={onSetDiscussions}/>
            <Grid container style={{maxHeight: 500, justifyContent: "center"}}>
                {discussions.map((currentDiscussion) => (
                    <Grid
                        item
                        xs={12}
                        style={{
                            paddingTop: "1vw",
                            paddingLeft: "1.4vw",
                            paddingRight: "1.4vw",
                        }}
                    >
                        <Box border={1} borderRadius="borderRadius" style={{marginBottom: 16, borderColor: "#c4c4c4"}}>
                            <Grid container>
                                <Grid
                                    item
                                    style={{
                                        paddingRight: "1vw",
                                        paddingLeft: "1vw",
                                        paddingTop: "1vw",
                                    }}
                                >
                                    <ProfilePicture
                                        profile_image={
                                            currentDiscussion?.discussion_author?.discussion_author_profile_image
                                        }
                                        profile_firstname={
                                            currentDiscussion?.discussion_author?.discussion_author_firstname
                                        }
                                        profile_lastname={
                                            currentDiscussion?.discussion_author?.discussion_author_lastname
                                        }
                                        defaultAvatarVariant={"h6"}
                                        onClickAvatar={() =>
                                            onClickProfileImage(
                                                currentDiscussion?.discussion_author?.discussion_author_id
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid
                                    item
                                    style={{
                                        paddingTop: "1vw",
                                    }}
                                    xs
                                >
                                    <Typography>
                                        <b>{currentDiscussion?.discussion_author?.discussion_author_name}</b>
                                    </Typography>
                                    {getTime(currentDiscussion?.time_created)}
                                </Grid>
                                <Grid item>
                                    <ViewProfileSendMessageButton
                                        authorId={currentDiscussion?.discussion_author?.discussion_author_id}
                                        onSendMessageClick={onSendMessageClick}/>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    style={{
                                        paddingLeft: "0.65vw",
                                    }}
                                >
                                    <Typography style={{margin: 10}}>
                                        {currentDiscussion?.discussion_text}
                                    </Typography>
                                    <Divider variant="fullWidth"/>
                                    <>
                                        {currentDiscussion?.comments.length > 2 ? (
                                            !currentDiscussion?.show_all ? (
                                                <Button
                                                    onClick={() => showAllComments(currentDiscussion?.discussion_id, setDiscussions)}
                                                    size="small"
                                                    style={{color: "#FF6500"}}
                                                >
                                                    Show all {currentDiscussion?.comments.length} comments
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={() => hideAllComments(currentDiscussion?.discussion_id, setDiscussions)}
                                                    size="small"
                                                    style={{color: "#FF6500"}}
                                                >
                                                    Hide comments
                                                </Button>
                                            )
                                        ) : (
                                            ""
                                        )}
                                    </>
                                </Grid>
                                <Grid
                                    container
                                    style={{paddingTop: 10, justifyContent: "center"}}
                                >
                                    {currentDiscussion?.comments.length > 0 ? (
                                        !currentDiscussion?.show_all ? (
                                            <Box
                                                border={1}
                                                borderRadius="borderRadius"
                                                style={{width: "90%", color: "#c4c4c4"}}
                                            >
                                                {currentDiscussion?.comments?.slice(-2).map((comment) => (
                                                    <Comments
                                                        comment={comment}
                                                        getTime={getTime}
                                                        onClickProfileImage={onClickProfileImage}
                                                        onSendMessageClick={onSendMessageClick}
                                                    />
                                                ))}
                                            </Box>
                                        ) : (
                                            <Box
                                                border={1}
                                                borderRadius="borderRadius"
                                                style={{width: "90%"}}
                                            >
                                                {currentDiscussion?.comments?.map((comment) => (
                                                    <Comments
                                                        comment={comment}
                                                        getTime={getTime}
                                                        onClickProfileImage={onClickProfileImage}
                                                        onSendMessageClick={onSendMessageClick}
                                                    />
                                                ))}
                                            </Box>
                                        )
                                    ) : (
                                        ""
                                    )}
                                </Grid>
                            </Grid>
                            <AddComment currentDiscussion={currentDiscussion} onSetDiscussion={onSetDiscussions}/>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default Discussion;
