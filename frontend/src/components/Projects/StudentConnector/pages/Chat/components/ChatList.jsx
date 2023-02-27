import List from "@material-ui/core/List";
import {Badge, Grid, ListItem, ListItemAvatar, Typography} from "@material-ui/core";
import ProfilePicture from "../../../components/ProfilePicture/ProfilePicture";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import {mainStyle} from "../styles/mainStyle";
import {useHistory} from "react-router-dom";

export const ChatList = ({chats, onSelectChat}) => {
    const classes = mainStyle();
    const history = useHistory();

    const onClickAvatar = (recipientId) => {
        history.push("/studentconnector/profile/" + recipientId)
    }

    return(
        <List>
            {chats?.map((x) => (
                <ListItem button onClick={() => onSelectChat(x)}>
                    <ListItemAvatar>
                        <Badge badgeContent={x.unread_messages} color="primary">
                            <ProfilePicture
                                profile_image={x?.recipient_user.profile_image}
                                profile_firstname={x?.recipient_user.firstname}
                                profile_lastname={x?.recipient_user.lastname}
                                onClickAvatar={() => onClickAvatar(x?.recipient_user.id)}
                            />
                        </Badge>
                    </ListItemAvatar>
                    <ListItemText
                        className={classes.text}
                    >
                        <Grid container>
                            <Grid item>
                                <Typography style={{fontWeight: "bold"}}>{x?.recipient_user?.firstname + " " + x?.recipient_user?.lastname}</Typography>
                            </Grid>
                            <Grid item>
                                {
                                    <Typography variant="subheading" noWrap>
                                        {x?.messages?.at(-1)?.message.length <= 8
                                            ? x?.messages?.at(-1)?.message
                                            : <>{(x?.messages.length > 0 ? x?.messages?.at(-1)?.message.substring(0, 8).toLowerCase() +
                                                "..." : "Send the first message")}</>}
                                    </Typography>
                                }</Grid>
                        </Grid>
                    </ListItemText>
                </ListItem>
            ))}
        </List>
    )
}