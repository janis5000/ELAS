import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import StudentConnector from "../../StudentConnector";
import SearchSite from "../CourseSearch/SearchSite";
import { createAuthConfig } from "../../utils/auth";
import Backend from "../../../../../assets/functions/Backend";
import Sidebar from "./Sidebar";
import EditProfile from "../../components/EditProfile";
import LectureSite from "../Lecture/LectureSite";
import ProfileView from "../Profile/ProfileView";
import { Grid } from "@material-ui/core";

const StudentConnectorRoutes = () => {
  return (
    <>
      <Grid>
        <div className="sidebar">
          <Sidebar />
          <div style={{ marginLeft: 300 }}>
            <Route
              exact
              path="/studentconnector"
              render={() => <StudentConnector />}
            />
            <Route
              exact
              path="/studentconnector/search-course"
              render={() => (
                <div style={{ marginTop: "40px" }}>
                  <SearchSite />
                </div>
              )}
            />
            <Route
              exact
              path="/studentconnector/profile/:id"
              render={() => <ProfileView />}
            />
            <Route
              exact
              path="/studentconnector/lecture/:id"
              render={() => <LectureSite />}
            />
          </div>
        </div>
      </Grid>
    </>
  );
};

export default StudentConnectorRoutes;
