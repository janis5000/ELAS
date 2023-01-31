import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { Grid, Typography } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import { AvatarGroup } from "@material-ui/lab";
import ProfilePicture from "../../../components/ProfilePicture";
import Button from "@material-ui/core/Button";
import React from "react";
import scStyles from "../../../utils/studentConnectorStyles";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  profilePicture: {
    width: theme.spacing(24),
    height: theme.spacing(24)
  },
  cardMediaMember: {
    paddingTop: '5.25%',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  }
}));

const MemberCard = ({ contentKey, mediaKey, member, onViewProfileClick, onSendMessageClick}) => {
  const classesSc = scStyles()
  const classes = useStyles()
  return (
    <>
      <Card className={classesSc.card}>
        <CardMedia className={classes.cardMediaMember} key={mediaKey} style={{ justifyContent: "center", display: "flex" }}>
          <ProfilePicture profile_image={member.profile_image}
                          profile_firstname={member.firstname}
                          profile_lastname={member.lastname}
                          defaultAvatarVariant={"h5"}
                          avatarClass={classes.profilePicture}
          />
        </CardMedia>
        <CardActions>
          <Grid container>
            <Grid item>
              {
                <Button size="small" color="secondary" onClick={onViewProfileClick} style={{color: "#FF6500"}}>
                  View Profile
                </Button>
              }
            </Grid>
            <Grid item>
              {
                <Button size="small" color="secondary" style={{paddingLeft: 50, color: "#FF6500"}} onClick={onSendMessageClick}>
                  Send Message
                </Button>
              }
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

export default MemberCard;