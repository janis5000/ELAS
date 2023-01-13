import React, {useEffect, useState} from 'react';
import Backend from "../../../assets/functions/Backend";
import Sidebar from './components/sidebar';
import { TextField } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import UserProfileEdit from "./components/EditProfile";

const StudentConnector = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    Backend.get("/studentconnector/home").then((response) => {
      let res = response.data
      setGreeting(res)
    });
  })

  return (
    <>
        <div className='profile'>
      <UserProfileEdit />
      </div>
      <div className='sidebar'>
      <Sidebar />
      </div>
    </>
  );

}

export default StudentConnector;