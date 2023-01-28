import {Grid, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import React from "react";

const DescriptionCard = ({classesSc, lectureInfo}) => {
    return (
        <Grid item>
            <Card className={classesSc.card}>
                <CardMedia>
                    <Typography style={{paddingLeft: 14, paddingTop: 10, fontSize: "0.9rem"}}><b>Description</b></Typography>
                </CardMedia>
                <CardContent
                    className={classesSc.cardContent}
                >
                    <Typography
                        gutterBottom
                        style={{ fontSize: "0.8rem" }}
                    >
                        {lectureInfo ? <>{lectureInfo.description}</> : "loading..."}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default DescriptionCard;