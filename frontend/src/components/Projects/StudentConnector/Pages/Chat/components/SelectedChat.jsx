import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import {Typography} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import {ChatBox, ReceiverMessage, SenderMessage} from "mui-chat-box";
import Avatar from "@material-ui/core/Avatar";
import React, {useContext} from "react";
import ProfileContext from "../../../utils/auth/ProfileContext";

export const SelectedChat = ({selectedChat}) => {
    const {profile, setProfile} = useContext(ProfileContext);
    return (<>{selectedChat && (
        <Card style={{overflow: "auto", background: "#e6e8eb"}}>
            <CardMedia
                style={{
                    background: "gray",
                    paddingLeft: 10,
                    paddingTop: 10,
                    paddingBottom: 10,
                }}
            >
                <Typography
                    variant="h6"
                    style={{
                        paddingLeft: 10,
                        paddingTop: 10,
                        paddingBottom: 10,
                        fontWeight: "bold",
                    }}
                >
                    {selectedChat?.recipient_user?.firstname +
                        " " +
                        selectedChat?.recipient_user?.lastname}
                </Typography>
            </CardMedia>
            <CardContent style={{height: 390}}>
                <ChatBox>
                    {selectedChat?.messages?.map((x) => (
                        <>
                            {x?.user_id !== profile?.id ? (
                                <ReceiverMessage
                                    avatar={
                                        <Avatar
                                            src={
                                                selectedChat?.recipient_user
                                                    ?.profile_image
                                            }
                                        ></Avatar>
                                    }
                                >
                                    {x?.message}
                                </ReceiverMessage>
                            ) : (
                                <SenderMessage
                                    avatar={
                                        <Avatar
                                            src={profile?.profile_image}
                                        ></Avatar>
                                    }
                                >
                                    {x?.message}
                                </SenderMessage>
                            )}
                        </>
                    ))}
                    <div style={{paddingBottom: 10}}></div>
                </ChatBox>
            </CardContent>
        </Card>
    )}</>)
}

export default SelectedChat;