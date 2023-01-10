import React, {useEffect, useState} from 'react';
import Backend from "../../../assets/functions/Backend";
import CButton from "./components/CButton"
import TemporaryDrawer from './components/sidebar';
import { TextField } from '@material-ui/core';

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
        <TemporaryDrawer/>
      </div>
    </>
  );


}

export default StudentConnector;