import React, {useContext, useEffect, useState} from "react";
import { Container, Grid } from "@material-ui/core";
import scStyles from "../../styles/scStyles"
import LectureCard from "../../components/LectureCard/LectureCard";
import { useHistory } from "react-router-dom";
import {ProfileContext} from "../../utils/auth/ProfileContext";
import {getLectureMembers} from "./utils/requests";

const Dashboard = () => {
  const {profile} = useContext(ProfileContext);
  const [lecturesWithMembers, setLecturesWithMembers] = useState(null);

  useEffect(() => {
    getLectureMembers(profile, setLecturesWithMembers);
  }, [profile]);

  const classes = scStyles();
  const history = useHistory();

  const RedirectToCourseSite = (id) => {
    let path = "/studentconnector/lecture/" + id;
    history.push(path);
  };

  return (
    <>
      {profile !== undefined && (profile?.courses === null || profile?.courses.length === 0) ? (
        "You have no courses selected yet."
      ) : (
        <Container className={classes.cardContainer} style={{ float: "left" }}>
          <Grid className={classes.cardGrid} container spacing={4}>
            {lecturesWithMembers?.map((x) => (
              <Grid item xs={6} md={3} lg={3} key={x.id}>
                <LectureCard
                  hasAction={true}
                  actionOnClick={() => RedirectToCourseSite(x.id)}
                  classesSc={classes}
                  lectureInfo={x}
                  contentKey={"content" + x.id}
                  mediaKey={"media" + x.id}
                  actionKey={"action" + x.id}
                  lectureMember={x.members}
                  hasMember={true}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </>
  );
};
export default Dashboard;
