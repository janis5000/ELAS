import React, {useContext, useState} from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory } from "react-router-dom";
import { Badge, Typography } from "@material-ui/core";
import {ProfileContext} from "../../utils/auth/ProfileContext";
import MessageContext from "../../utils/messages/MessageContext";
import {style} from "./style";



const Sidebar = () => {
    const classes = style();
    const {profile} = useContext(ProfileContext);
    const {message, setMessage} = useContext(MessageContext);
    const [state] = useState({
        left: false,
    });

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
        setMessage(0);
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
                <ListItem button
                          onClick={dashboardButton}>
                    <ListItemText
                        primary="Dashboard"
                        className={classes.text}
                    />
                </ListItem>

                <ListItem button
                          onClick={searchCourseButton}>
                    <ListItemText
                        primary="Search Courses"
                        className={classes.text}
                    />
                </ListItem>
                <ListItem button
                          onClick={messageButton}>
                    <ListItemText
                        primary={
                            <>
                                <Badge
                                    className={classes.badgePadding}
                                    badgeContent={message}
                                    color="primary"
                                    variant="dot"
                                ><Typography>Messages</Typography></Badge>
                            </>
                        }
                        className={classes.text}
                    />
                </ListItem>
                <ListItem button
                          onClick={myProfileButton}>
                    <ListItemText
                        primary="My Profile"
                        className={classes.text}
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
