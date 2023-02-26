import {Container, Grid} from "@material-ui/core";
import PropTypes from "prop-types";
import React, {useContext} from "react";
import Discussion from "./Discussion";
import MemberCard from "./MemberCard";
import scStyles from "../../../styles/scStyles";
import ProfileContext from "../../../utils/auth/ProfileContext";

function DiscussionMemberTabPanel(props) {
  const {
    value,
    index,
    onClickProfileImage,
      members,
      onViewProfileMemberClick,
    onSendMessageClick,
  } = props;

  const classes = scStyles()

  const {profile} = useContext(ProfileContext);

  return (
    <div role="tabpanel">
      {value === index && index === 0 && (
        <Discussion
          profile={profile}
          onClickProfileImage={onClickProfileImage}
          onSendMessageClick={onSendMessageClick}
        />
      )}
      {value === index && index === 1 && (
          <Container className={classes.cardContainer} style={{float: "left"}}>
            <Grid className={classes.cardGrid} container spacing={2}>
              {members?.map(x => (
                  <Grid item xs={6} md={4} lg={4}>
                    <MemberCard owner={profile} member={x} mediaKey={x.id} onViewProfileClick={() => onViewProfileMemberClick(x.id)}
                                onSendMessageClick={() => onSendMessageClick(x.id)}/>
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
