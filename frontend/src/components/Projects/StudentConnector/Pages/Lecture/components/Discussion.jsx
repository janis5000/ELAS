import { Divider, Grid, Paper, TextField, Typography } from "@material-ui/core";
import ProfilePicture from "../../../components/ProfilePicture";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import Box from "@material-ui/core/Box";
import Comments from "./Comments";
import React from "react";

const Discussion = ({        discussions,
                      profile,
                      postDiscussion,
                      onDiscussionTextChange,
                      text,
                      discussionIdNewCommentText,
                      onCommentTextChange,
                      postComment,
                      showAllComments,
                      hideAllComments,
                      onClickProfileImage}) => {
  const getTime = (textObjectCreation) => {
    let timeDelta = Date.now() - Date.parse(textObjectCreation);
    if (timeDelta < 1000 * 60) {
      return (
        <Typography style={{ color: "gray", fontWeight: 100, fontSize: 12 }}>
          {Math.round(timeDelta / 1000) + "seconds ago"}
        </Typography>
      );
    } else if (timeDelta < 1000 * 60 * 60) {
      return (
        <Typography style={{ color: "gray", fontWeight: 100, fontSize: 12 }}>
          {Math.round(timeDelta / (1000 * 60)) + "minutes ago"}
        </Typography>
      );
    } else if (timeDelta < 1000 * 60 * 60 * 24) {
      return (
        <Typography style={{ color: "gray", fontWeight: 100, fontSize: 12 }}>
          {Math.round(timeDelta / (1000 * 60 * 60)) + "hours ago"}
        </Typography>
      );
    } else if (timeDelta > 1000 * 60 * 60 * 24) {
      return (
        <Typography style={{ color: "gray", fontWeight: 100, fontSize: 12 }}>
          {Math.round(timeDelta / (1000 * 60 * 60 * 24)) + "days ago"}
        </Typography>
      );
    }
  };

  return (
    <Paper style={{ overflow: "auto" }}>
      <Grid container style={{ padding: "1.4vw" }}>
        <Grid item xs={3}>
          <Typography>Discussion</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        justify="flex-start"
        style={{ padding: "0 1.6vw 1.4vw 1.4vw" }}
      >
        <Grid item style={{ paddingRight: "1vw" }}>
          <ProfilePicture
            profile_image={profile?.profile_image}
            profile_firstname={profile?.firstname}
            profile_lastname={profile?.lastname}
            defaultAvatarVariant={"h6"}
            onClickAvatar={null}
          />
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
            <SendIcon />
          </Button>
        </Grid>
      </Grid>
      <Grid container style={{ maxHeight: 500, justifyContent: "center" }}>
        {discussions.map((x) => (
          <Grid
            item
            xs={12}
            style={{
              paddingTop: "1vw",
              paddingLeft: "1.4vw",
              paddingRight: "1.4vw",
            }}
          >
            <Box border={1} borderRadius="borderRadius">
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
                      x?.discussion_author?.discussion_author_profile_image
                    }
                    profile_firstname={
                      x?.discussion_author?.discussion_author_firstname
                    }
                    profile_lastname={
                      x?.discussion_author?.discussion_author_lastname
                    }
                    defaultAvatarVariant={"h6"}
                    onClickAvatar={() =>
                      onClickProfileImage(
                        x?.discussion_author?.discussion_author_id
                      )
                    }
                  />
                </Grid>
                <Grid
                  item
                  style={{
                    paddingTop: "1vw",
                  }}
                >
                  <Typography>
                    <b>{x?.discussion_author?.discussion_author_name}</b>
                  </Typography>
                  {getTime(x?.time_created)}
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    paddingLeft: "0.65vw",
                  }}
                >
                  <Typography style={{ margin: 10 }}>
                    {x?.discussion_text}
                  </Typography>
                  <Divider variant="fullWidth" />
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
                <Grid
                  container
                  style={{ paddingTop: 10, justifyContent: "center" }}
                >
                  {x?.comments.length > 0 ? (
                    !x?.show_all ? (
                      <Box
                        border={1}
                        borderRadius="borderRadius"
                        style={{ width: "90%" }}
                      >
                        {x?.comments?.slice(-2).map((comment) => (
                          <Comments
                            comment={comment}
                            getTime={getTime}
                            onClickProfileImage={onClickProfileImage}
                          />
                        ))}
                      </Box>
                    ) : (
                      <Box
                        border={1}
                        borderRadius="borderRadius"
                        style={{ width: "90%" }}
                      >
                        {x?.comments?.map((comment) => (
                          <Comments
                            comment={comment}
                            getTime={getTime}
                            onClickProfileImage={onClickProfileImage}
                          />
                        ))}
                      </Box>
                    )
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
              <Grid
                container
                justify="flex-start"
                style={{ padding: "0 1.6vw 1.4vw 1.4vw" }}
              >
                <Grid item style={{ paddingRight: "1vw" }}></Grid>
                <Grid item xs={9} style={{ paddingTop: "1vw" }}>
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
                <Grid item style={{ paddingTop: "1vw" }}>
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
                    <SendIcon />
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Discussion;