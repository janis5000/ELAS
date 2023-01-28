import React, { useEffect, useState } from "react";
import Backend from "../../../../../assets/functions/Backend";
import { useHistory, useParams } from "react-router-dom";
import { createAuthConfig, createPostAuthConfig } from "../../utils/auth";
import Button from "@material-ui/core/Button";
import {
  Container,
  Grid,
  Paper,
  Tab,
  Tabs, TextField,
  Typography,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import scStyles from "../../utils/studentConnectorStyles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import SendIcon from '@material-ui/icons/Send';

function TabPanel(props) {
  const { children, value, index, profile, ...other } = props;

  return (
    <div role="tabpanel" {...other}>
      {value === index && index === 0 && (
        <Paper style={{ overflow: "auto" }}>
          <Grid container style={{ padding: "1.4vw" }}>
            <Grid item xs={3}>
              <Typography>Discussion</Typography>
            </Grid>
          </Grid>
          <Grid container justify="flex-start" style={{ padding: "0 1.6vw 1.4vw 1.4vw" }}>
            <Grid item style={{paddingRight: "1vw"}}>
              <Avatar alt="profile pic" src={profile?.profile_image}></Avatar>
            </Grid>
            <Grid item xs={9}>
              <form noValidate autoComplete="off">
                <TextField
                  id="outlined-basic"
                  label="Post a message"
                  variant="outlined"
                  fullWidth
                  size="small"
                />
              </form>
            </Grid>
            <Grid item>
              <Button
                  color="primary"
                  variant="contained"
                  style={{
                    marginLeft: 10,
                    backgroundColor: "#FF6500",
                    color: "white",
                  }}
              >
                <SendIcon />
              </Button>
          </Grid>
          </Grid>
        </Paper>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(8),

    paper: {},
    typography: {
      margin: theme.spacing(1),
      padding: theme.spacing(4),
    },
  },
}));
const LectureSite = () => {
  const classes = useStyles();
  const classesSc = scStyles();

  const [profile, setProfile] = useState(null);
  const [lectureInfo, setLectureInfo] = useState(null);
  const [otherUsers, setOtherUsers] = useState(null);
  const [viewType, setViewType] = useState("discussion");
  const [tabIndex, setTabIndex] = useState(0);

  const params = useParams();

  const history = useHistory();

  const authConfig = createAuthConfig();
  //const postAuthConfig = createPostAuthConfig();
  useEffect(() => {
    Backend.get("/studentconnector/profile", authConfig).then((response) => {
      let profileRes = response.data;
      setProfile(profileRes);
    });
    Backend.get("/studentconnector/lecture/" + params.id).then((response) => {
      let lecture = response.data;
      setLectureInfo(lecture[0]);
      console.log(lecture[0]);
    });
    getOtherUsers();
  }, []);

  const getOtherUsers = () => {
    Backend.get("/studentconnector/other-users/" + params.id).then(
      (response) => {
        let users = response.data;
        setOtherUsers(users);
        console.log(users);
      }
    );
  };

  const addCourseToProfile = () => {
    Backend.post(
      "/studentconnector/add-course/" + params.id,
      {},
      authConfig
    ).then((response) => {
      console.log(response.data);
      let prevProfile = null;
      setProfile((prevState) => {
        prevProfile = { ...prevState };
        prevProfile.courses.push(lectureInfo);
        setProfile(prevProfile);
      });
      getOtherUsers();
    });
  };

  const removeCourseFromProfile = () => {
    Backend.post(
      "/studentconnector/remove-course/" + params.id,
      {},
      authConfig
    ).then((response) => {
      console.log(response.data);
      let prevProfile = null;
      setProfile((prevState) => {
        prevProfile = { ...prevState };
        prevProfile.courses = prevProfile.courses.filter(
          (x) => x["id"] !== params.id
        );
        setProfile(prevProfile);
      });
      getOtherUsers();
    });
  };

  const profileHasCourse = () => {
    let p = profile?.courses?.filter((x) => x["id"] === params.id);
    if (p != null) {
      return p.length > 0;
    } else {
      return false;
    }
  };

  const redirectToProfile = (id) => {
    let path = "/studentconnector/profile/" + id;
    history.push(path);
  };

  const handleViewTypeChange = (event, newValue) => {
    if (newValue === 0) {
      setViewType("discussion");
      setTabIndex(0);
    } else if (newValue === 1) {
      setViewType("members");
      setTabIndex(1);
    }
  };

  const changeViewType = (newViewType) => {
    setViewType(newViewType);
  };
  return (
    <>
      <Grid container>
        <Container className={classesSc.cardContainer}>
          <Grid className={classesSc.cardGrid} container spacing={3}>
            <Grid item xs={3} md={3} lg={3}>
              <Card className={classesSc.card}>
                <CardMedia
                  className={classesSc.cardMedia}
                  image="https://nur-muth.com/wp-content/uploads/2022/02/bluebox-hintergrund-filmlexikon.jpeg"
                  key={"media" + "1"}
                ></CardMedia>
                <CardContent
                  className={classesSc.cardContent}
                  key={"content" + "1"}
                >
                  <Typography
                    gutterBottom
                    variant="h6"
                    style={{ fontSize: "1.1rem" }}
                  >
                    {lectureInfo ? <>{lectureInfo.name}</> : "loading..."}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={9} md={9} lg={9}>
              <AppBar position="static">
                <Tabs
                  className={classesSc.tabStyle}
                  value={tabIndex}
                  onChange={handleViewTypeChange}
                >
                  <Tab label="Discussion" />
                  <Tab label="Members" />
                </Tabs>
              </AppBar>
              <TabPanel value={tabIndex} index={0} profile={profile}>
                Item One
              </TabPanel>
              <TabPanel value={tabIndex} index={1}>
                Item Two
              </TabPanel>
            </Grid>
          </Grid>
        </Container>
        <Paper className={classes.root} elevation={3}>
          <Typography className={classes.root}>
            {lectureInfo ? (
              <>
                <h1>{lectureInfo["name"]}</h1>
                {lectureInfo["description"]}
              </>
            ) : (
              "loading..."
            )}
          </Typography>
          {profile && !profileHasCourse() ? (
            <Button
              variant="contained"
              color="primary"
              onClick={addCourseToProfile}
            >
              Add Course
            </Button>
          ) : (
            <></>
          )}
          {profile && profileHasCourse() ? (
            <Button
              variant="contained"
              color="primary"
              onClick={removeCourseFromProfile}
            >
              Remove Course
            </Button>
          ) : (
            <></>
          )}
          {otherUsers &&
            otherUsers.map((x) => (
              <Card>
                <CardContent onClick={() => redirectToProfile(x.id)} key={x.id}>
                  {x.firstname + " " + x.lastname}
                </CardContent>
              </Card>
            ))}
        </Paper>
      </Grid>
    </>
  );
};

export default LectureSite;
