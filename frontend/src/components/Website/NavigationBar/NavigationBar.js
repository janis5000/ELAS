import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {Divider, Grid, ListItemIcon, ListItemText, Menu, MenuItem,} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import SettingsIcon from "@material-ui/icons/Settings";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  primaryButton: {
    margin: theme.spacing(0, 1, 0, 1),
    borderRadius: theme.spacing(1, 0.5, 1, 0.5),
  },
  avatarName: {
    cursor: "pointer",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  appBar:{
    zIndex: theme.zIndex.drawer + 1,
  }
}));

export default function NavigationBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const isLoggedIn = !!sessionStorage.getItem("elas_userLoggedIn");
  const [openProfile, setOpenProfile] = useState(null);

  const handleSignOut = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  const toggleProfileList = (e) => {
    setOpenProfile(e.currentTarget);
  };

  const openAdmin = () => {
    setOpenProfile(null);
    history.push("/admin");
  };

  return (
    <>
      <AppBar position="sticky" color="inherit" style={{backgroundColor: "#fff"}} className={classes.appBar}>
        <Toolbar>
          <Grid container>
            <Grid item xs className={classes.title} alignItems="center">
              <img src="/images/logos/cover.png" height="35" alt="ELAS Logo" onClick={() => history.push("/")}
                   style={{cursor: "pointer"}}/>
            </Grid>
            {isLoggedIn ? (
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Avatar className={classes.avatarName} onClick={toggleProfileList}> A </Avatar>
                    <Menu anchorEl={openProfile} getContentAnchorEl={null} keepMounted
                          anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                          transformOrigin={{vertical: "top", horizontal: "left"}}
                          open={Boolean(openProfile)} onClose={() => setOpenProfile(null)}>
                      <MenuItem onClick={openAdmin}>
                        <ListItemIcon>
                          <SettingsIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary="Settings"/>
                      </MenuItem>

                      <Divider/>

                      <MenuItem onClick={handleSignOut}>
                        <ListItemIcon>
                          <PowerSettingsNewIcon color="primary"/>{" "}
                        </ListItemIcon>
                        <ListItemText primary="Sign-out"/>
                      </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid item>
                <Button variant="contained" color="primary" className={classes.primaryButton}
                        onClick={() => history.push('/login')}>
                  Login
                </Button>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}
