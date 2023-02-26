import React, {useContext, useEffect, useState} from "react";
import {
    Container,
    Grid,
    Paper, Snackbar,
    TextField,
    Typography,
} from "@material-ui/core";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import {mainStyle} from "./styles/mainStyle";
import {ChatList} from "./components/ChatList";
import SelectedChat from "./components/SelectedChat";
import AuthConfigContext from "../../utils/auth/AuthConfig";
import {getChatsOfUser, getChatsAndSetChatWithUserIdToUnread, sendMessageToChatId} from "./utils/requests";
import ProfileContext from "../../utils/auth/ProfileContext";


const Messages = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [chats, setChats] = useState([]);
    const {profile} = useContext(ProfileContext);
    const [selectedChat, setSelectedChat] = useState(null);
    const [text, setText] = useState("");
    const [color] = useState("green");
    const authConfig = useContext(AuthConfigContext)

    const classes = mainStyle();

    useEffect(() => {
        getChatsOfUser(setChats, authConfig)
    }, []);

    const getChatRoomData = (recipientId) => {
        getChatsAndSetChatWithUserIdToUnread(recipientId, setChats, setSelectedChat, authConfig)
    }

    const sendNewMessage = (chat) => {
        sendMessageToChatId(chat.chat_id, {
            message: text,
        }, setSnackBarMessage, setOpenSnackbar, authConfig)
    };

    const onSelectChat = (chat) => {
        getChatRoomData(chat.recipient_user.id)
    };
    const onTextChange = (event) => {
        setText(event.target.value);
    };

    const sendMessage = (chat) => {
        sendNewMessage(chat);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <>
            <Container fixed style={{paddingTop: 30}}>
                <Grid container style={{width: "90%"}}>
                    <Paper style={{width: "100%"}}>
                        <Grid container>
                            <Grid item xs={3}>
                                <Grid item style={{paddingLeft: 10, paddingTop: 10}}>
                                    <ProfilePicture
                                        profile_image={profile?.profile_image}
                                        profile_firstname={profile?.firstname}
                                        profile_lastname={profile?.lastname}
                                        avatarClass={classes.profilePicture}
                                        defaultAvatarVariant={"h2"}
                                    />
                                </Grid>
                                <Grid item style={{paddingLeft: 55}}>
                                    <Typography variant="h5">
                                        {profile?.firstname + " " + profile?.lastname}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        variant="h6"
                                        style={{color: "gray", paddingLeft: 10, paddingTop: 20}}
                                    >
                                        Last messages
                                    </Typography>
                                    <ChatList chats={chats} onSelectChat={onSelectChat}/>
                                </Grid>
                            </Grid>
                            <Grid item xs={9} style={{height: "100%"}}>
                                <Grid
                                    item
                                    style={{
                                        paddingTop: 15,
                                        paddingRight: 30,
                                        paddingBottom: 30,
                                    }}
                                >
                                    <SelectedChat selectedChat={selectedChat}/>

                                    <form
                                        noValidate
                                        autoComplete="off"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                        }}
                                    >
                                        {selectedChat !== null ? <><TextField
                                            id="outlined-basic"
                                            label="Send a message"
                                            variant="outlined"
                                            style={{width: "90%"}}
                                            size="small"
                                            onChange={onTextChange}
                                            value={text}
                                        />
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                style={{
                                                    backgroundColor: "#FF6500",
                                                    color: "white",
                                                }}
                                                onClick={() => sendMessage(selectedChat)}
                                            >
                                                <SendIcon/>
                                            </Button></> : ""}
                                    </form>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Container>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message={snackBarMessage}
                style={{backgroundColor: color}}
            />
        </>
    );
};

export default Messages;
