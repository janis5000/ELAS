import {
  Avatar,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import FormDialog from "../FormDialog";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect, useState } from "react";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      // width: theme.spacing(30),
      height: theme.spacing(35),
    },
    width: '100%'
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

const DescriptionCard = ({ currentProfile, isOwner, setCurrentProfile }) => {
  const classes = useStyles();

  const [editable, setEditable] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    setDescription(currentProfile?.description);
  }, [currentProfile]);

  const handleSave = () => {
    setCurrentProfile({ ...currentProfile, description: description });
    setEditable(false);
  };

  const onChange = (event) => {
    if (isOwner) {
      setDescription(event.target.value);
      setEditable(true);
    }
  };

  const onSetEditable = () => {
    if (isOwner) {
      setEditable(true);
    }
  };

  const onStopEditing = () => {
    setEditable(false);
    setDescription(currentProfile?.description);
  };

  return (
    <>
      <Grid container>
        <Paper className={classes.root}>
          <div style={{ padding: 5 }}>
            <Grid container>
              <Grid item>
                <Typography className={classes.profileDescription} variant="h5">
                  About me
                </Typography>
              </Grid>
              <IconButton onClick={onSetEditable}>
                <Tooltip
                  title="Click on text to begin editing"
                >
                  <EditOutlinedIcon
                    fontSize="small"
                    style={{ color: "#FF6500" }}
                  />
                </Tooltip>
              </IconButton>
            </Grid>
            <Grid item className={classes.center}>
              <textarea
                style={{ width: "100%" }}
                className={classes.textarea}
                rows={11}
                aria-label="Field name"
                value={description}
                onChange={onChange}
                placeholder="enter a short story of yourself"
                disabled={!editable}
              />
            </Grid>

            <Box className={classes.saveAbout}>
              {editable ? (
                <>
                  <Button
                    onClick={onStopEditing}
                    variant="text"
                    color="primary"
                    style={{marginRight: 16}}
                  >
                    Cancel
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
                    Save
                  </Button>
                </>
              ) : (
                ""
              )}
            </Box>
          </div>
        </Paper>
      </Grid>
    </>
  );
};

export default DescriptionCard;