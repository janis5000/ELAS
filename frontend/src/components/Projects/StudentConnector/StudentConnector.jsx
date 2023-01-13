import React, {useEffect, useState} from 'react';
import Backend from "../../../assets/functions/Backend";
import Chat from "./Chat";
import SearchSite from "./components/SearchSite";
import { createAuthConfig } from "./utils/auth"
import Box from "@material-ui/core/Box";
import {Container, Grid} from "@material-ui/core";
import Sidebar from './components/Sidebar';
import { TextField } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import UserProfileEdit from "./components/EditProfile";
import {Route} from "react-router-dom";
import EditProfile from "./components/EditProfile";
import StudentConnectorRoutes from "./components/Routes";


const StudentConnector = () => {
  return (
    <>
    </>
  );

}

export default StudentConnector;