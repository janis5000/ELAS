import {createContext, useEffect, useState} from "react";

const AuthConfigContext = createContext({
    headers: {}
})

const createAuthConfig = () => {
    if (sessionStorage.getItem("elas_user") !== null) {

        return ({
            headers:
                {
                    Authorization: "Bearer " + JSON.parse(sessionStorage.getItem("elas_user"))["token"]
                }
        })

    } else {
        return {headers:{}};
    }
}

export const AuthConfigContextProvider = (props) => {
    const [config, setConfig] = useState({
        headers: {}
    });
    useEffect(() => {setConfig(createAuthConfig());}, [])

    return (
        <AuthConfigContext.Provider value={config}>
            {props.children}
        </AuthConfigContext.Provider>
    )
}

export default AuthConfigContext;