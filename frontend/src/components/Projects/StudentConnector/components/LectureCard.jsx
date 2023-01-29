import {Avatar, Grid, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {AvatarGroup} from "@material-ui/lab";
import ProfilePicture from "./ProfilePicture";

const LectureCard = ({classesSc, lectureInfo, mediaKey, contentKey, hasAction, actionOnClick, lectureMember, hasMember}) => {
    return (
        <>
            <Card className={classesSc.card}>
                <CardMedia
                    className={classesSc.cardMedia}
                    image="https://nur-muth.com/wp-content/uploads/2022/02/bluebox-hintergrund-filmlexikon.jpeg"
                    key={mediaKey}
                ></CardMedia>
                <CardContent
                    className={classesSc.cardContent}
                    key={contentKey}
                >
                    <Typography
                        gutterBottom
                        variant="h6"
                        style={{ fontSize: "1.1rem" }}
                    >
                        {lectureInfo ? <>{lectureInfo.name}</> : "loading..."}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container>
                        <Grid item xs={6}>
                            {hasMember && (<Typography style={{fontSize: 11, color:"gray"}}>Members</Typography>)}
                            {hasMember && lectureMember?.length > 0 && (<AvatarGroup max={3}>
                                {lectureMember?.map(x =>(
                                    <ProfilePicture profile_firstname={x.firstname}
                                                    profile_lastname={x.lastname}
                                                    profile_image={x.profile_image}
                                    defaultAvatarVariant="h6"/>))}
                            </AvatarGroup>)}
                        </Grid>
                        <Grid item xs={6} style={{paddingLeft: "1.4vw"}}>
                            {hasAction && <Button size="small" color="primary" onClick={actionOnClick}>View Course</Button>}
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </>
    )
}

export default LectureCard;