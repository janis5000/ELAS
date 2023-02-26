import {createContext, useContext, useEffect, useState} from "react";
import ProfileContext from "../auth/ProfileContext";

export const MessageContext = createContext(0);

export const MessageContextProvider = (props) => {
    const [message, setMessage] = useState(0);
    const {profile, setProfile} = useContext(ProfileContext);

    useEffect(() => {
        setMessage(profile?.all_unread_messages)
    }, [profile])

    return(
        <MessageContext.Provider value={{message, setMessage}}>
            {props.children}
        </MessageContext.Provider>
    )

}

export default MessageContext;