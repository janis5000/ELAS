import {Avatar, Typography} from "@material-ui/core";
import React from "react";

const ProfilePicture = ({profile_image, profile_firstname, profile_lastname, onClickAvatar, avatarClass, defaultAvatarVariant}) => {
    return (
        <>
            {profile_image !== null ?
                <Avatar
                    alt="profile picture"
                    src={profile_image}
                    className={avatarClass}
                    onClick={onClickAvatar}
                />
                :
                <Avatar
                    alt="profile picture"
                    className={avatarClass}
                    onClick={onClickAvatar}>
                    <Typography variant={defaultAvatarVariant}>{profile_firstname[0] + profile_lastname[0]}</Typography>
                </Avatar>
            }
        </>
    )
}

export default ProfilePicture;