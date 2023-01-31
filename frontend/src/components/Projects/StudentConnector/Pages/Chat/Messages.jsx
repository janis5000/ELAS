import React, { useEffect, useState } from "react";
import Backend from "../../../../../assets/functions/Backend";
import { createAuthConfig } from "../../utils/auth";
import {
  Badge,
  Container,
  Grid,
  ListItem,
  ListItemAvatar,
  Paper, Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import ProfilePicture from "../../components/ProfilePicture";
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from "../Sidebar/Sidebar";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import { ChatBox, ReceiverMessage, SenderMessage } from "mui-chat-box";
import Avatar from "@material-ui/core/Avatar";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  profilePicture: {
    width: theme.spacing(24),
    height: theme.spacing(24),
  },
  text: {
    fontFamily: "Roboto",
    color: "black",
    display: "inline",
    maxHeight: "50%",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    width: 10,
    maxWidth: 10,
  },
}));

const Messages = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [profile, setProfile] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [text, setText] = useState("");
  const [color, setColor] = useState("green");
  const authConfig = createAuthConfig();

  const classes = useStyles();

  useEffect(() => {
    Backend.get("/studentconnector/profile", authConfig).then((response) => {
      let profileRes = response.data;
      setProfile(profileRes);
    });
    Backend.get("/studentconnector/chats", authConfig).then((response) => {
      let chatsRes = response.data;
      setChats(chatsRes);
    });
  }, []);

  const getChatRoomData = (recipientId) => {
    Backend.get("/studentconnector/chatroom?id=" + recipientId, authConfig).then((response) => {
      setChats(prevState => {
        let prevChats = [...prevState]
        for(let i = 0; i<prevChats.length; i++){
          if(prevChats[i].recipient_user.id === recipientId){
            prevChats[i].unread_messages = 0
          }
        }
        setChats(prevChats);
      })
    })
  }

  const sendNewMessage = (chat) => {
    Backend.post(
      "/studentconnector/send-message/" + chat.chat_id,
      {
        message: text,
      },
      authConfig
    ).then((response) => {
      setSnackBarMessage("Successfully sent message!")
      setOpenSnackbar(true)
    });
  };

  const onSelectChat = (chat) => {
    debugger;
    getChatRoomData(chat.recipient_user.id)
    setSelectedChat(chat);
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
      <Sidebar />
      <Container fixed style={{ paddingTop: 30 }}>
        <Grid container style={{ width: "90%" }}>
          <Paper style={{ width: "100%" }}>
            <Grid container>
              <Grid item xs={3}>
                <Grid item style={{ paddingLeft: 10, paddingTop: 10 }}>
                  <ProfilePicture
                    profile_image={profile?.profile_image}
                    profile_firstname={profile?.firstname}
                    profile_lastname={profile?.lastname}
                    avatarClass={classes.profilePicture}
                  />
                </Grid>
                <Grid item style={{ paddingLeft: 55 }}>
                  <Typography variant="h5">
                    {profile?.firstname + " " + profile?.lastname}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="h6"
                    style={{ color: "gray", paddingLeft: 10, paddingTop: 20 }}
                  >
                    Last messages
                  </Typography>
                  <List>
                    {chats?.map((x) => (
                      <ListItem button>
                        <ListItemAvatar>
                          <Badge badgeContent={x.unread_messages} color="primary">
                          <ProfilePicture
                            profile_image={x?.recipient_user.profile_image}
                            profile_firstname={x?.recipient_user.firstname}
                            profile_lastname={x?.recipient_user.lastname}
                          />
                          </Badge>
                        </ListItemAvatar>
                        <ListItemText
                          className={classes.text}
                          onClick={() => onSelectChat(x)}
                        >
                          {
                            <Typography variant="subheading" noWrap>
                              {x?.messages?.at(-1)?.message.length <= 8
                                ? x?.messages?.at(-1)?.message
                                : <>{(x?.messages.length > 0 ? x?.messages?.at(-1)?.message.substring(0, 8) +
                                  "..." : "")}</>}
                            </Typography>
                          }
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
              <Grid item xs={9} style={{ height: "100%" }}>
                <Grid
                  item
                  style={{
                    paddingTop: 15,
                    paddingRight: 30,
                    paddingBottom: 30,
                  }}
                >
                  {selectedChat && (
                    <Card style={{ overflow: "auto", background: "#e6e8eb" }}>
                      <CardMedia
                        style={{
                          background: "gray",
                          paddingLeft: 10,
                          paddingTop: 10,
                          paddingBottom: 10,
                        }}
                      >
                        <Typography
                          variant="h6"
                          style={{
                            paddingLeft: 10,
                            paddingTop: 10,
                            paddingBottom: 10,
                            fontWeight: "bold",
                          }}
                        >
                          {selectedChat?.recipient_user?.firstname +
                            " " +
                            selectedChat?.recipient_user?.lastname}
                        </Typography>
                      </CardMedia>
                      <CardContent style={{ height: 390 }}>
                        <ChatBox>
                          {selectedChat?.messages?.map((x) => (
                            <>
                              {x?.user_id !== profile?.id ? (
                                <ReceiverMessage
                                  avatar={
                                    <Avatar
                                      src={
                                        selectedChat?.recipient_user
                                          ?.profile_image
                                      }
                                    ></Avatar>
                                  }
                                >
                                  {x?.message}
                                </ReceiverMessage>
                              ) : (
                                <SenderMessage
                                  avatar={
                                    <Avatar
                                      src={profile?.profile_image}
                                    ></Avatar>
                                  }
                                >
                                  {x?.message}
                                </SenderMessage>
                              )}
                            </>
                          ))}
                          <div style={{ paddingBottom: 10 }}></div>
                        </ChatBox>
                        <form
                          noValidate
                          autoComplete="off"
                          onSubmit={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="Send a message"
                            variant="outlined"
                            style={{ width: "90%" }}
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
                            <SendIcon />
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  )}
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
          style={{ backgroundColor: color}}
      />
    </>
  );
};

export default Messages;
