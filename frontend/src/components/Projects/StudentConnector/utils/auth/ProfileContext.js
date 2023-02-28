import {createContext, useContext, useEffect, useState} from "react";
import {authenticatedGet} from "../requests/BackendRequests";
import AuthConfigContext from "./AuthConfig";
import {isEmptyObject} from "../dataOperations/DataStructureOperations";

export const ProfileContext = createContext({
    profile: {},
    setProfile: () => {
    },
});


export const ProfileContextProvider = (props) => {
    const [profile, setProfile] = useState();
    const authConfig = useContext(AuthConfigContext);


    const onSetUser = (val) => {
        setProfile(val);
    }

    useEffect(() => {
        if (!isEmptyObject(authConfig.headers)) {
            authenticatedGet('profile', onSetUser, authConfig)
        }
    }, [authConfig])
    return (
        <ProfileContext.Provider value={{profile, setProfile}}>
            {props.children}
        </ProfileContext.Provider>
    );
}

export default ProfileContext;