import React, { useEffect, useState } from "react";
import {
  Chip,
  Grid,
  makeStyles,
  Paper, Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DoneIcon from "@material-ui/icons/Done";
import IconButton from "@material-ui/core/IconButton";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Button from "@material-ui/core/Button";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      // width: theme.spacing(30),
      height: theme.spacing(35),
    },
    width: "100%",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  saveAbout: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "right",
    verticalAlign: "text-bottom",
    marginTop: 15,
  },
  profileDescription: {
    color: "#000000",
    lineHeight: 1.5,
  },
  textarea: {
    backgroundColor: "transparent",
    border: 0,
    borderColor: "#303f9f",
    padding: "8px",
    width: "100%",
  },
}));
const SkillsCard = ({
  currentProfile,
  setCurrentProfile,
  currentSkills,
  setCurrentSkills,
  allSkills,
  isOwner,
    setSkillsRemove
}) => {
  const classes = useStyles();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [color, setColor] = useState("green");
  const [editable, setEditable] = useState(false);
  const [text, setText] = useState("");
  const onChangeSkills = (event, newValue) => {
    setCurrentSkills((prevState) => {
      let prevSkills = [...prevState]
      if (newValue !== null && newValue.skill_name !== "") {
        prevSkills.push(newValue);
        setSnackBarMessage("Successfully added " + newValue.skill_name + " as a new skill")
        setColor("green")
        setOpenSnackbar(true)
      }
      setCurrentSkills(prevSkills);
    })
  }

  const onAddItem = () => {
    if(text !== ""){
      onChangeSkills(null, {"skill_name": text})
    }
  }

  const onTextChange = (val) => {
    setText(val)
  }

  const handleDelete = (element) => {
    if(isOwner && editable) {
      let newSkills = []
      setCurrentSkills(prevState => {
            let prevSkills = [...prevState]
            newSkills = prevSkills.filter((e) => e.skill_name !== element.skill_name)
            setSnackBarMessage("Successfully removed the skill " + element.skill_name)
            setColor("red")
            setOpenSnackbar(true)
            setCurrentSkills(newSkills)
          }
      );
      setSkillsRemove(prevState => {
        prevState.push(element)
        setSkillsRemove(prevState)
      })
    }
  };

  const handleSave = () => {
    if(isOwner) {
      setCurrentProfile({...currentProfile, "skills": currentSkills})
      onStopEditing()
    }
  }

  const onSetEditable = () => {
    if (isOwner) {
      setEditable(true);
    }
  };

  const onStopEditing = () => {
    setEditable(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Grid container direction="column">
      <Paper className={classes.root}>
        <div style={{ padding: 5 }}>
            <Grid container>
              <Grid item>
                <Typography className={classes.profileDescription} variant="h5">
                  Skills
                </Typography>
              </Grid>
              {isOwner && <IconButton onClick={onSetEditable}>
                <Tooltip title="Click on text to begin editing">
                  <EditOutlinedIcon
                    fontSize="small"
                    style={{ color: "#FF6500" }}
                  />
                </Tooltip>
              </IconButton>}
            </Grid>
            {currentSkills?.map((x) => (
              <Chip
                clickable
                color="primary"
                onClick={() => handleDelete(x)}
                deleteIcon={<DoneIcon />}
                color="primary"
                label={x?.skill_name}
                key={x?.id}
                style={{marginLeft: 1, marginRight: 1}}
              ></Chip>
            ))}
            {editable && <Grid item className={classes.center}>
              <>
              <Autocomplete
                id="Skills"
                options={allSkills}
                getOptionLabel={(option) => option.skill_name || ''}
                getOptionSelected={(option, value) => option.id === value.id || true}
                style={{ width: 300 }}
                freeSolo
                onChange={(event, newValue) => {
                  if(typeof(newValue) !== "string"){
                      onChangeSkills(event, newValue);
                  }
                  else{
                    onChangeSkills(event, {"skill_name": newValue})
                  }
                }}
                className={classes.preSelectInput}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Skills"
                    variant="standard"
                    placeholder="All skills"
                    size="small"
                    onChange={(event) => onTextChange(event.target.value)}
                  />
                )}
              />
                <Button
                    onClick={onStopEditing}
                    variant="text"
                    color="primary"
                    style={{marginRight: 16}}
                >
                  Cancel
                </Button>
                <Button
                    onClick={onAddItem}
                    variant="contained"
                    color="primary"
                    style={{
                      backgroundColor: "#FF6500",
                      color: "white",
                      marginRight: 16
                    }}
                >
                  Add
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    color="primary"
                    style={{
                      backgroundColor: "#FF6500",
                      color: "white",
                    }}
                >
                  <SaveOutlinedIcon />
                  Done
                </Button>
              </>
            </Grid>}
        </div>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackBarMessage}
        style={{ backgroundColor: color}}
    />
    </Grid>
  );
};

export default SkillsCard;
