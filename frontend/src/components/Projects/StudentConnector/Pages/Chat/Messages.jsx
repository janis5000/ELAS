import React, { useEffect, useState } from "react";
import Backend from "../../../../../assets/functions/Backend";
import { createAuthConfig } from "../../utils/auth";
import {
  Container,
  Grid,
  ListItem,
  ListItemAvatar,
  Paper,
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
  const [chats, setChats] = useState([]);
  const [profile, setProfile] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
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

  const onSelectChat = (chat) => {
    setSelectedChat(chat);
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
                          <ProfilePicture
                            profile_image={x?.recipient_user.profile_image}
                            profile_firstname={x?.recipient_user.firstname}
                            profile_lastname={x?.recipient_user.lastname}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          className={classes.text}
                          onClick={() => onSelectChat(x)}
                        >
                          {
                            <Typography variant="subheading" noWrap>
                              {x?.messages?.at(-1)?.message.length <= 8
                                ? x?.messages?.at(-1)?.message
                                : x?.messages?.at(-1)?.message.substring(0, 8) +
                                  "..."}
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
                    <Card style={{overflow: "auto", background: "#e6e8eb" }}>
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
                      <CardContent
                        style={{ height: 390}}
                      >
                        {selectedChat?.messages?.map(x => (<>
                            {x?.user_id === profile.id ? <Box style={{padding: 20, textAlign: "right", alignContent: "end"}}>
                              <Card>
                                <CardContent>
                                  {x?.message}
                                </CardContent>
                              </Card>
                            </Box> : <Box style={{padding: 20, textAlign: "left"}}>
                              <Card>
                                <CardContent>
                                  <ProfilePicture
                                    profile_image={selectedChat?.recepient_user?.profile_image}
                                    profile_firstname={selectedChat?.recepient_user?.firstname}
                                    profile_lastname={selectedChat?.recepient_user?.lastname}
                                />
                                {x?.message}
                              </CardContent>
                              </Card>
                            </Box> }
                            </>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </>
  );
};

export default Messages;
