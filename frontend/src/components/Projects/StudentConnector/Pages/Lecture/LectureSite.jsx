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
  Tabs,
  TextField,
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
import SendIcon from "@material-ui/icons/Send";
import LectureCard from "../../components/LectureCard";
import DescriptionCard from "./components/DescriptionCard";
import DiscussionMemberTabPanel from "./components/DiscussionMemberTabPanel";

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
  const [discussions, setDiscussions] = useState([]);
  const [discussionText, setDiscussionText] = useState("");
  const [discussionIdNewCommentText, setDiscussionIdNewCommentText] = useState({"id":"","text":""})

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
    getDiscussions();
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

  const getDiscussions = () => {
    Backend.get("/studentconnector/discussions/" + params.id).then(
      (response) => {
        let discussionsRes = response.data;
        setDiscussions(discussionsRes);
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

  const postDiscussion = () => {
    Backend.post(
      "/studentconnector/start-discussion",
      {
        lecture_id: params.id,
        text: discussionText,
      },
      authConfig
    ).then((res) => {
      getDiscussions();
      clearTextFields();
    });
  };

  const clearTextFields = () => {
    setDiscussionText("")
    setDiscussionIdNewCommentText({"id":"", "text":""})

  }

  const postComment = (discussion_id) => {
    Backend.post(
        "/studentconnector/add-comment",
        {
          "text": discussionIdNewCommentText.text,
          "discussion_id": discussion_id
        },
        authConfig
    ).then((response) => {
      getDiscussions();
      clearTextFields();
      /*let discussionRes = response.data
      setDiscussions(prevState => {
        let prevDiscussions = [...prevState]
        prevDiscussions.forEach(x => {
          if(x.discussion_id == discussion_id){
            x = discussionRes
          }
        })
        setDiscussions(prevDiscussions)
      })*/
    });
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

  const onDiscussionTextChange = (event) => {
    setDiscussionText(event.target.value);
  };

  const changeViewType = (newViewType) => {
    setViewType(newViewType);
  };

  const onCommentTextChange = (event, id) => {
    setDiscussionIdNewCommentText({"id":id, "text":event.target.value})
  }

  const showAllComments = (id) => {
    setDiscussions(prevState => {
      let prevDiscussions = [...prevState]
      prevDiscussions.forEach(x => {
        if(x.discussion_id === id){
          x.show_all = true;
        }
      })
      setDiscussions(prevDiscussions)
    })
  }

  const hideAllComments = (id) => {
    setDiscussions(prevState => {
      let prevDiscussions = [...prevState]
      prevDiscussions.forEach(x => {
        if(x.discussion_id === id){
          x.show_all = false;
        }
      })
      setDiscussions(prevDiscussions)
    })
  }

  return (
    <>
      <Container fixed>
        <Grid className={classesSc.cardGrid} container spacing={3}>
          <Grid item xs={3} spacing={3}>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <LectureCard
                  classesSc={classesSc}
                  lectureInfo={lectureInfo}
                  mediaKey={"media" + lectureInfo?.id}
                  contentKey={"content" + lectureInfo?.id}
                  hasAction={false}
                  actionOnClick={null}
                />
              </Grid>
              <Grid item>
                <DescriptionCard
                  classesSc={classesSc}
                  lectureInfo={lectureInfo}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={9}>
            <AppBar position="static">
              <Tabs
                className={classesSc.tabStyle}
                value={tabIndex}
                onChange={handleViewTypeChange}
                TabIndicatorProps={{style: {background: "#FF6500"}}}
              >
                <Tab label="Discussion" />
                <Tab label="Members" />
              </Tabs>
            </AppBar>
            <DiscussionMemberTabPanel
              value={tabIndex}
              index={0}
              profile={profile}
              postDiscussion={postDiscussion}
              onDiscussionTextChange={onDiscussionTextChange}
              text={discussionText}
              discussions={discussions}
              discussionIdNewCommentText={discussionIdNewCommentText}
              onCommentTextChange={onCommentTextChange}
              postComment={postComment}
              showAllComments={showAllComments}
              hideAllComments={hideAllComments}
            />
            <DiscussionMemberTabPanel value={tabIndex} index={1} />
          </Grid>
        </Grid>
        {profile && !profileHasCourse() ? (
          <Button
            onClick={addCourseToProfile}
            style={{
              marginLeft: 10,
              backgroundColor: "#FF6500",
              color: "white",
              justifyContent: "center",
            }}
          >
            Add Course to Dashboard
          </Button>
        ) : (
          <></>
        )}
        {profile && profileHasCourse() ? (
          <Button
            style={{
              marginLeft: 10,
              backgroundColor: "#FF6500",
              color: "white",
              justifyContent: "center",
            }}
            onClick={removeCourseFromProfile}
          >
            Remove Course from Dashboard
          </Button>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default LectureSite;
