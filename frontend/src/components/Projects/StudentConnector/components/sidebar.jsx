import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'white',
    fontFamily: 'Roboto',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(2),
  },
  logoText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 500,
  },
  logoIcon: {
    marginRight: theme.spacing(1),
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  listItem: {
    color: 'black',
  },
}));

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <div className={classes.logo}>
          {/* Add your logo here */}
          <div className={classes.logoIcon}>{/* Your logo icon goes here */}</div>
          <div className={classes.logoText}>Your logo text goes here</div>
        </div>
        <ListItem button key={'Dashboard'} className={classes.listItem}>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary={'Dashboard'} />
        </ListItem>
        <ListItem button key={'Search Courses'} className={classes.listItem}>
          <ListItemIcon><SearchIcon /></ListItemIcon>
          <ListItemText primary={'Search Courses'} />
        </ListItem>
        <ListItem button key={'Messages'} className={classes.listItem}>
          <ListItemIcon><MailIcon /></ListItemIcon>
          <ListItemText primary={'Messages'} />
        </ListItem>
        <ListItem button key={'My Profile'} className={classes.listItem}>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary={'My Profile'} />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <React.Fragment key={'left'}>
        <Drawer open={state['left']} onClose={toggleDrawer('left', false)}>
          {sideList('left')}
        </Drawer>
      </React.Fragment>
    </div>
  );
}