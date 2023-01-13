import React, { useState } from "react";
import { TextField, Button, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import { Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textField: {
    backgroundColor: "white",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "blue"
      }
    }
  },
  select: {
    backgroundColor: "white",
    "& .MuiSelect-root": {
      "& fieldset": {
        borderColor: "blue"
      }
    }
  }
}));
const UserProfileEdit = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [degree_id, setDegreeId] = useState("");
  const classes = useStyles();


  const handleSkillsChange = (event) => {
    const skillsList = event.target.value.split(' ');
    setSkills(skillsList);
  };

  const handleSave = async () => {
    const user_id = JSON.parse(sessionStorage.getItem("elas_user")).id;


    const data = { firstName, lastName, email, description, skills, degree_id};
    try {
          let user_id = JSON.parse(sessionStorage.getItem("elas_user")).id,
          response = await fetch('http://localhost:5000/studentconnector/profile/${}', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
          });
      console.log(response);
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <form className={classes.root} >
    <div>
      <TextField
        label="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="standard-multiline-flexible"
        label="Description"
        multiline
        maxRows={5}
        value={description}
        variant="outlined"
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Skills"
        onChange={handleSkillsChange}
      />
       <Select
      labelId="degree-label"
      id="degree-select"
      value={degree_id}
      onChange={(e) => setDegreeId(e.target.value)}
       >
      <MenuItem value="1">Angewandte Informatik</MenuItem>
      <MenuItem value="2">Master</MenuItem>
      <MenuItem value="3">Option 3</MenuItem>
      <MenuItem value="4">Option 4</MenuItem>
      <MenuItem value="5">Option 5</MenuItem>
    </Select>
    <Button variant="contained" color="primary" onClick={handleSave}>
        Save
    </Button>
    </div>
    </form>

  );
};

export default UserProfileEdit;
