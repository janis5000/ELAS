import {Divider, Grid, Paper, TextField, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import React from "react";

function DiscussionMemberTabPanel(props) {
  const {
    discussions,
    value,
    index,
    profile,
    postDiscussion,
    onDiscussionTextChange,
    text,
  } = props;

  const getTime = (discussion) => {
    let timeDelta = (Date.now() - Date.parse(discussion?.time_created) )
    if(timeDelta < 1000*60){
      return (<Typography style={{color: "gray"}}>
        {Math.round(timeDelta / 1000) + "seconds ago"}
      </Typography>)
    }
    else if(timeDelta < 1000*60*60){
      return (<Typography style={{color: "gray"}}>
        {Math.round(timeDelta / (1000 * 60)) + "minutes ago"}
      </Typography>)
    }
    else if(timeDelta < 1000*60*60*24){
      return (<Typography style={{color: "gray"}}>
        {Math.round(timeDelta / (1000 * 60 * 60)) + "hours ago"}
      </Typography>)
    }
    else if(timeDelta > 1000*60*60*24){
      return (<Typography style={{color: "gray"}}>
        {Math.round(timeDelta / (1000 * 60 * 60 * 24)) + "days ago"}
      </Typography>)
    }

  }

  return (
    <div role="tabpanel">
      {value === index && index === 0 && (
        <Paper style={{ overflow: "auto" }}>
          <Grid container style={{ padding: "1.4vw" }}>
            <Grid item xs={3}>
              <Typography>Discussion</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justify="flex-start"
            style={{ padding: "0 1.6vw 1.4vw 1.4vw" }}
          >
            <Grid item style={{ paddingRight: "1vw" }}>
              <Avatar alt="profile pic" src={profile?.profile_image}/>
            </Grid>
            <Grid item xs={9}>
              <form noValidate autoComplete="off">
                <TextField
                  id="outlined-basic"
                  label="Post a message"
                  variant="outlined"
                  fullWidth
                  size="small"
                  onChange={onDiscussionTextChange}
                  value={text}
                />
              </form>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                style={{
                  marginLeft: 10,
                  backgroundColor: "#FF6500",
                  color: "white",
                }}
                onClick={postDiscussion}
              >
                <SendIcon />
              </Button>
            </Grid>
          </Grid>
          <Grid container style={{ maxHeight: 500 }}>
            <Grid item xs={12}>
              <Box border={1}>
                {discussions.map(x =>
                  <Grid container>
                    <Grid item style={{ paddingRight: "1vw", paddingLeft: "1vw", paddingTop: "1vw" }}>
                      <Avatar alt="profile pic" src={x?.discussion_author?.discussion_author_profile_image}/>
                    </Grid>
                    <Grid item>
                      <Typography>{x?.discussion_author?.discussion_author_name}</Typography>
                      {getTime(x)}
                    </Grid>
                    <Grid item xs={12}>
                      <Typography style={{margin: 10}}>{x?.discussion_text}</Typography>
                      <Divider variant="fullWidth"/>
                    </Grid>
                  </Grid>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
    </div>
  );
}

DiscussionMemberTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default DiscussionMemberTabPanel;