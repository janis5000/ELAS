import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Route, useHistory } from "react-router-dom";
import StudentConnector from "../../StudentConnector";
import SearchSite from "../CourseSearch/SearchSite";
import Backend from "../../../../../assets/functions/Backend";
import { createAuthConfig } from "../../utils/auth";
import Avatar from "@material-ui/core/Avatar";
import { Badge, Typography } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";

const useStyles = makeStyles((theme) => ({
  // adjust this value to match the height of your header
  drawer: {
    zIndex: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  menuButton: {},
  text: {
    fontFamily: "Roboto",
    color: "black",
    margin: 10,
  },
  icon: {
    marginTop: 64,
    marginLeft: 8,
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    left: false,
  });

  const [newMessageAmount, setNewMessageAmount] = useState(0);

  const authConfig = createAuthConfig();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (authConfig !== null) {
      getProfile();
    }
  }, []);

  const getProfile = () => {
    Backend.get("/studentconnector/profile", authConfig).then((response) => {
      let profileRes = response.data;
      setProfile(profileRes);
    });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const history = useHistory();

  const searchCourseButton = () => {
    let path = `/studentconnector/search-course`;
    history.push(path);
  };
  const dashboardButton = () => {
    let path = "/studentconnector/";
    history.push(path);
  };

  const myProfileButton = () => {
    let path = "/studentconnector/profile/" + profile.id;
    history.push(path);
  };

  const messageButton = () => {
    let path = "/studentconnector/chats/";
    history.push(path);
  };

  const list = (anchor) => (
    <div className={classes.list} role="presentation">
      <List>
        <ListItem className={classes.icon}>
          <img
            src="/images/StudentConnector.png"
            height="24"
            alt="studect Logo"
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary="Dashboard"
            className={classes.text}
            onClick={dashboardButton}
          />
        </ListItem>

        <ListItem button>
          <ListItemText
            primary="Search Courses"
            className={classes.text}
            onClick={searchCourseButton}
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={
              <>
                <Badge
                  className={classes.badgePadding}
                  badgeContent={profile?.all_unread_messages}
                  color="primary"
                  variant="dot"
                ><Typography>Messages</Typography></Badge>
              </>
            }
            className={classes.text}
            onClick={messageButton}
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary="My Profile"
            className={classes.text}
            onClick={myProfileButton}
          />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Drawer
        className="drawer"
        anchor={"left"}
        open={state["left"]}
        variant="permanent"
      >
        {profile !== null && list("left")}
      </Drawer>
    </div>
  );
};

export default Sidebar;
