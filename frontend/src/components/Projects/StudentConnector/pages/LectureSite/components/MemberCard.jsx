import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import {Grid} from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import ProfilePicture from "../../../components/ProfilePicture/ProfilePicture";
import Button from "@material-ui/core/Button";
import React from "react";
import scStyles from "../../../styles/scStyles";
import {memberCardStyle} from "../styles/memberCardStyle";


const MemberCard = ({mediaKey, member, onViewProfileClick, onSendMessageClick, owner}) => {
    const classesSc = scStyles()
    const classes = memberCardStyle()
    return (
        <>
            <Card className={classesSc.card}>
                <CardMedia className={classes.cardMediaMember} key={mediaKey}
                           style={{justifyContent: "center", display: "flex"}}>
                    <ProfilePicture profile_image={member.profile_image}
                                    profile_firstname={member.firstname}
                                    profile_lastname={member.lastname}
                                    defaultAvatarVariant={"h2"}
                                    avatarClass={classes.profilePicture}
                    />
                </CardMedia>
                <CardActions>
                    <Grid container>
                        <Grid item>
                            {
                                <Button size="small" color="secondary" onClick={onViewProfileClick}
                                        style={{color: "#FF6500"}}>
                                    View Profile
                                </Button>
                            }
                        </Grid>
                        <Grid item>
                            {owner.id !== member.id ?
                                <Button size="small" color="secondary" style={{paddingLeft: 50, color: "#FF6500"}}
                                        onClick={onSendMessageClick}>
                                    Send Message
                                </Button> : ""
                            }
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </>
    );
};

export default MemberCard;