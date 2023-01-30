import React, { useEffect, useState } from "react";
import Backend from "../../../../../assets/functions/Backend";
import { createAuthConfig } from "../../utils/auth";
import {Grid, ListItem, ListItemAvatar, Paper, Typography} from "@material-ui/core";
import ProfilePicture from "../../components/ProfilePicture";
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from "../Sidebar/Sidebar";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  profilePicture: {
    width: theme.spacing(24),
    height: theme.spacing(24),
  },
  text: {
    fontFamily: "Roboto",
    color: "black",
    display: "inline",
    maxHeight: '50%',
    whiteSpace: 'nowrap',
    textOverflow: "ellipsis",
    width: 10,
    maxWidth: 10
  },
}));

const Messages = () => {
  const [chats, setChats] = useState([]);
  const [profile, setProfile] = useState(null);
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
  return (
    <>
      <Sidebar />
      <Grid container style={{ width: "90%" }}>
        <Paper style={{ width: "100%" }}>
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
                            textOverflow="ellipsis">
                            {<div style={{textOverflow: "ellipsis", whiteSpace: 'nowrap',
                              width: 10}}>{x?.messages?.at(-1)?.message}</div>}
                            </ListItemText>
                        </ListItem>
                      ))}
                </List>
              </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default Messages;
