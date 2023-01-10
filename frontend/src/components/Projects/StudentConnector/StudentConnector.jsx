import React, {useEffect, useState} from 'react';
import Backend from "../../../assets/functions/Backend";
import Chat from "./Chat";

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
      <Chat/>
    </>
  );

}

export default StudentConnector;