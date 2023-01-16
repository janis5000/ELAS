import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Route, useHistory} from "react-router-dom";
import StudentConnector from "../StudentConnector";
import SearchSite from "./SearchSite";
import Backend from "../../../../assets/functions/Backend";
import {createAuthConfig} from "../utils/auth";

const useStyles = makeStyles({
 // adjust this value to match the height of your header
 drawer: {
  zIndex: -12,
},
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuButton: {
    marginRight: 10,
  },
  text: {
    fontFamily: 'Roboto',
    color: 'black',
  },
});

const Sidebar = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const authConfig = createAuthConfig()
  const [profile, setProfile] = useState(null);

  useEffect(() => {
        if (authConfig !== null) {
          Backend.get("/studentconnector/profile", authConfig).then((response) => {
            let profileRes = response.data
            setProfile(profileRes)
          })
        }
      }
  , [])

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const history = useHistory();

  const searchCourseButton = () =>{
    let path = `/studentconnector/search-course`;
    history.push(path);
  }
  const dashboardButton = () => {
    let path = "/studentconnector/";
    history.push(path);
  }

  const myProfileButton = () => {
    let path = "/studentconnector/profile/" + profile.id;
    history.push(path);
  }

  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button>
          <ListItemText primary="Dashboard" className={classes.text} onClick={dashboardButton}/>

        </ListItem>
        <ListItem button>
          <ListItemText primary="Search Courses" className={classes.text} onClick={searchCourseButton} />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Messages" className={classes.text} />
        </ListItem>
        <ListItem button>
          <ListItemText primary="My Profile" className={classes.text} onClick={myProfileButton} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer('left', true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer 
      className='drawer' 
      anchor={'left'} 
      open={state['left']} 
      onClose={toggleDrawer('left', false)}>
        {list('left')}
      </Drawer>
    </div>
  );
}

export default Sidebar;
