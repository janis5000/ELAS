import {Grid, TextField} from "@material-ui/core";
import ProfilePicture from "../../../components/ProfilePicture/ProfilePicture";
import Button from "@material-ui/core/Button";
import {postDiscussionById} from "../utils/requests";
import SendIcon from "@material-ui/icons/Send";
import React, {useContext, useState} from "react";
import AuthConfigContext from "../../../utils/auth/AuthConfig";
import ProfileContext from "../../../utils/auth/ProfileContext";

export const StartDiscussion = ({discussion_id, onSetDiscussion}) => {
    const {profile, setProfile} = useContext(ProfileContext)
    const authConfig = useContext(AuthConfigContext)

    const [discussionText, setDiscussionText] = useState("");

    const clearTextFields = () => {
        setDiscussionText("")
    }
    const onDiscussionTextChange = (event) => {
        setDiscussionText(event.target.value);
    };
    return (
        <Grid
            container
            justify="flex-start"
            style={{padding: "0 1.6vw 1.4vw 1.4vw"}}
        >
            <Grid item style={{paddingRight: "1vw"}}>
                <ProfilePicture
                    profile_image={profile?.profile_image}
                    profile_firstname={profile?.firstname}
                    profile_lastname={profile?.lastname}
                    defaultAvatarVariant={"h6"}
                    onClickAvatar={null}
                />
            </Grid>
            <Grid item xs={9}>
                <form
                    noValidate
                    autoComplete="off"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <TextField
                        id="outlined-basic"
                        label="Post a message"
                        variant="outlined"
                        fullWidth
                        size="small"
                        onChange={onDiscussionTextChange}
                        value={discussionText}
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
                    onClick={() => postDiscussionById(discussion_id,
                        {
                            lecture_id: discussion_id,
                            text: discussionText,
                        }, onSetDiscussion, clearTextFields, authConfig,
                    )}
                >
                    <SendIcon/>
                </Button>
            </Grid>
        </Grid>
    )
}

export default StartDiscussion;