import React, {useEffect, useState} from 'react';
import Backend from "../../../assets/functions/Backend";
import Sidebar from './components/sidebar';
import { TextField } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';

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
      <div className='sidebar'>
      <Sidebar />
      </div>
    </>
  );

}

export default StudentConnector;