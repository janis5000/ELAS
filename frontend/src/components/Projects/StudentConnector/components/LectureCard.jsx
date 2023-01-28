import {Grid, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const LectureCard = ({classesSc, lectureInfo, mediaKey, contentKey, hasAction, actionOnClick}) => {
    return (
        <Grid item>
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
                    {hasAction && <Button size="small" color="primary" onClick={actionOnClick}>View Course</Button>}
                </CardActions>
            </Card>
        </Grid>
    )
}

export default LectureCard;