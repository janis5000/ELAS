import {Grid, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {postCommentById} from "../utils/requests";
import SendIcon from "@material-ui/icons/Send";
import React, {useContext, useState} from "react";
import AuthConfigContext from "../../../utils/auth/AuthConfig";

export const AddComment = ({currentDiscussion, onSetDiscussion}) => {

    const [discussionIdNewCommentText, setDiscussionIdNewCommentText] = useState({"id": "", "text": ""})
    const authConfig = useContext(AuthConfigContext);
    const clearTextFields = () => {
        setDiscussionIdNewCommentText({"id": "", "text": ""})
    }

    const onCommentTextChange = (event, id) => {
        setDiscussionIdNewCommentText({"id": id, "text": event.target.value})
    }

    return(
        <Grid
            container
            justify="flex-start"
            style={{padding: "0 1.6vw 1.4vw 1.4vw"}}
        >
            <Grid item style={{paddingRight: "1vw"}}></Grid>
            <Grid item xs={10} style={{paddingTop: "1vw"}}>
                <TextField
                    id="outlined-basic"
                    label="Post a message"
                    variant="outlined"
                    fullWidth
                    size="small"
                    onChange={(event) =>
                        onCommentTextChange(event, currentDiscussion.discussion_id)
                    }
                    value={
                        discussionIdNewCommentText.id === currentDiscussion.discussion_id
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
                    onClick={() => postCommentById(currentDiscussion.discussion_id, {
                            "text": discussionIdNewCommentText.text,
                            "discussion_id": currentDiscussion.discussion_id
                        }, onSetDiscussion, clearTextFields, authConfig
                    )}
                >
                    <SendIcon/>
                </Button>
            </Grid>
        </Grid>
    )
}

export default AddComment;