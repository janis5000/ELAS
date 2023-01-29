import {Container, Divider, Grid, Paper, TextField, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import React from "react";
import Comments from "./Comments";
import ProfilePicture from "../../../components/ProfilePicture";
import Discussion from "./Discussion";
import MemberCard from "./MemberCard";
import scStyles from "../../../utils/studentConnectorStyles";

function DiscussionMemberTabPanel(props) {
  const {
    discussions,
    value,
    index,
    profile,
    postDiscussion,
    onDiscussionTextChange,
    text,
    discussionIdNewCommentText,
    onCommentTextChange,
    postComment,
    showAllComments,
    hideAllComments,
    onClickProfileImage,
      members,
      onViewProfileMemberClick,
  } = props;

  const classes = scStyles()

  return (
    <div role="tabpanel">
      {value === index && index === 0 && (
        <Discussion
          profile={profile}
          postDiscussion={postDiscussion}
          onDiscussionTextChange={onDiscussionTextChange}
          text={text}
          discussions={discussions}
          discussionIdNewCommentText={discussionIdNewCommentText}
          onCommentTextChange={onCommentTextChange}
          postComment={postComment}
          showAllComments={showAllComments}
          hideAllComments={hideAllComments}
          onClickProfileImage={onClickProfileImage}
        />
      )}
      {value === index && index === 1 && (
          <Container className={classes.cardContainer} style={{float: "left"}}>
            <Grid className={classes.cardGrid} container spacing={2}>
              {members?.map(x => (
                  <Grid item xs={6} md={4} lg={4}>
                    <MemberCard member={x} mediaKey={x.id} actionOnClick={() => onViewProfileMemberClick(x.id)}/>
                  </Grid>
          ))}
            </Grid>
          </Container>
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
