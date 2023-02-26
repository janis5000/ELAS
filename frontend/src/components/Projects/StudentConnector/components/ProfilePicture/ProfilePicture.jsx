import {Avatar, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {blue, deepOrange, deepPurple, green, indigo} from "@material-ui/core/colors";

const ProfilePicture = ({profile_image, profile_firstname, profile_lastname, onClickAvatar, avatarClass, defaultAvatarVariant}) => {
    const [backgroundColor, setBackgroundColor] = useState("")

    useEffect(() => {
        setBackgroundColorByLetter()
    })

    const setBackgroundColorByLetter = () => {
        if(profile_firstname?.length > 0){
            if (profile_firstname[0] < "A") {
                setBackgroundColor(indigo[500])
            }
            else if (profile_firstname[0] >= "A" && profile_firstname[0] <= "F"){
                setBackgroundColor(deepOrange[500])
            }
            else if(profile_firstname[0] > "F" && profile_firstname[0] <= "M"){
                setBackgroundColor(blue[200])
            }
            else if(profile_firstname[0] > "M" && profile_firstname[0] <= "T"){
                setBackgroundColor(green[800])
            }
            else{
                setBackgroundColor(deepPurple[500])
            }
        }
    }

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
                    onClick={onClickAvatar}
                    style={{backgroundColor:  backgroundColor}}>
                    <Typography variant={defaultAvatarVariant}>{profile_firstname[0].toUpperCase() + profile_lastname[0].toUpperCase()}</Typography>
                </Avatar>
            }
        </>
    )
}

export default ProfilePicture;