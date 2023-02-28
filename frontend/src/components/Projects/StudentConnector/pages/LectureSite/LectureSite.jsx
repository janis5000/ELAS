import React, {useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
    Container,
    Grid,
    Tab,
    Tabs,
    Typography,
} from "@material-ui/core";
import scStyles from "../../styles/scStyles"
import AppBar from "@material-ui/core/AppBar";
import LectureCard from "../../components/LectureCard/LectureCard";
import DescriptionCard from "./components/DescriptionCard";
import DiscussionMemberTabPanel from "./components/DiscussionMemberTabPanel";
import ProfileContext from "../../utils/auth/ProfileContext";
import {
    createNewChatById,
    getLecturesById
} from "./utils/requests";
import AuthConfigContext from "../../utils/auth/AuthConfig";
import {profileHasCourse, addCourseToProfile, removeCourseFromProfileById} from "./utils/utils";

const LectureSite = () => {
    const classesSc = scStyles();

    const {profile, setProfile} = useContext(ProfileContext);
    const authConfigCx = useContext(AuthConfigContext);
    const [lectureInfo, setLectureInfo] = useState(null);
    const [viewType, setViewType] = useState("discussion");
    const [tabIndex, setTabIndex] = useState(0);

    const params = useParams();

    const history = useHistory();

    useEffect(() => {
        getLecturesById(params.id, setLectureInfo)
    }, []);

    const handleViewTypeChange = (event, newValue) => {
        if (newValue === 0) {
            setViewType("discussion");
            setTabIndex(0);
        } else if (newValue === 1) {
            setViewType("members");
            setTabIndex(1);
        }
    };

    const onClickProfileImage = (profile_id) => {
        history.push("/studentconnector/profile/" + profile_id)
    }

    const onViewProfileMemberClick = (profile_id) => {
        history.push("/studentconnector/profile/" + profile_id)
    }

    const onSendMessageClick = (recipientId) => {
        createNewChatById(recipientId, authConfigCx)
        history.push("/studentconnector/chats")
    }

    return (
        <>
            <Container fixed style={{paddingTop: 20, float: "left"}}>
                <Grid className={classesSc.cardGrid} container spacing={3}>
                    <Grid item xs={12} md={3} spacing={3}>
                        <Grid container direction="column" spacing={3}>
                            <Grid item style={{paddingBottom: 40}}>
                                <LectureCard
                                    classesSc={classesSc}
                                    lectureInfo={lectureInfo}
                                    mediaKey={"media" + lectureInfo?.id}
                                    contentKey={"content" + lectureInfo?.id}
                                    contentKey={"action" + lectureInfo?.id}
                                    hasAction={false}
                                    actionOnClick={null}
                                    hasMember={false}
                                />
                            </Grid>
                            <Grid item>
                                <DescriptionCard
                                    classesSc={classesSc}
                                    lectureInfo={lectureInfo}
                                />
                            </Grid>
                            <Grid item>
                                {profile && !profileHasCourse(params.id, profile) ? (
                                    <Button
                                        onClick={() => addCourseToProfile(params.id, setProfile, lectureInfo, authConfigCx)}
                                        style={{
                                            backgroundColor: "#FF6500",
                                            color: "white",
                                            marginLeft: 45
                                        }}
                                    >
                                        <Typography style={{fontSize: 12}}>Add Course to Dashboard</Typography>
                                    </Button>
                                ) : (
                                    <></>
                                )}
                                {profile && profileHasCourse(params.id, profile) ? (
                                    <Button
                                        style={{
                                            backgroundColor: "#FF6500",
                                            color: "white",
                                            marginLeft: 25
                                        }}
                                        onClick={() => removeCourseFromProfileById(params.id, setProfile, authConfigCx)}
                                    >
                                        <Typography style={{fontSize: 12}}>Remove Course from Dashboard</Typography>
                                    </Button>
                                ) : (
                                    <></>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <AppBar position="static">
                            <Tabs
                                className={classesSc.tabStyle}
                                value={tabIndex}
                                onChange={handleViewTypeChange}
                                TabIndicatorProps={{style: {background: "#FF6500"}}}
                            >
                                <Tab label="Discussion"/>
                                <Tab label="Members"/>
                            </Tabs>
                        </AppBar>
                        <DiscussionMemberTabPanel
                            value={tabIndex}
                            index={0}
                            profile={profile}
                            onClickProfileImage={onClickProfileImage}
                            onSendMessageClick={onSendMessageClick}
                        />
                        <DiscussionMemberTabPanel
                            value={tabIndex}
                            index={1}
                            profile={profile}
                            members={lectureInfo?.members}
                            onViewProfileMemberClick={onViewProfileMemberClick}
                            onSendMessageClick={onSendMessageClick}/>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default LectureSite;
