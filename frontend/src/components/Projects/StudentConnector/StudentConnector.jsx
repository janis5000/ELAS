import React, {useEffect, useState} from 'react';
import Backend from "../../../assets/functions/Backend";
import Chat from "./Chat";
import SearchSite from "./components/SearchSite";
import { createAuthConfig } from "./utils/auth"
import Box from "@material-ui/core/Box";
import {Container, Grid} from "@material-ui/core";
import Sidebar from './components/sidebar';
import { TextField } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';


const StudentConnector = () => {
  const [profile, setProfile] = useState(null);

  const authConfig = createAuthConfig()

  useEffect(() => {
    Backend.get("/studentconnector/profile", authConfig).then((response) => {
      let res = response.data
      setProfile(res)
    })
  }, [])

  return (
    <>
      <div className='sidebar'>
      <Sidebar />
      </div>
      <div style={{marginTop: "40px"}}>
      <SearchSite Profile={profile}/>
    </div>
    </>
  );

}

export default StudentConnector;