import {IconButton, ListItemIcon, Menu, MenuItem, Typography} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import VisibilityIcon from '@material-ui/icons/Visibility';
import MessageIcon from '@material-ui/icons/Message';
import React from "react";
import {useHistory} from "react-router-dom";

const ViewProfileSendMessageButton = ({authorId, onSendMessageClick}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const history = useHistory()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onClickViewProfile = (userId) => {
        let path = "/studentconnector/profile/" + userId
        history.push(path)
    }

    return (<>
            <IconButton onClick={handleClick} style={{color: "#FF6500"}}>
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => onClickViewProfile(authorId)}>
                    <ListItemIcon style={{float: "left", minWidth: "33"}}>
                        <VisibilityIcon/>
                    </ListItemIcon>
                    <Typography variant="inherit" style={{float: "left"}}>View Profile</Typography>
                </MenuItem>
                <MenuItem onClick={() => onSendMessageClick(authorId)}>
                    <ListItemIcon style={{float: "left", minWidth: "33"}}>
                        <MessageIcon/>
                    </ListItemIcon>
                    <Typography variant="inherit" style={{float: "left"}}>Send Message</Typography>
                </MenuItem>
            </Menu></>
    )
}

export default ViewProfileSendMessageButton;