import axios from "axios";

export const createAuthConfig = () => {
    if (sessionStorage.getItem("elas_user") !== null) {
        return {
            headers: {
                Authorization: "Bearer " + JSON.parse(sessionStorage.getItem("elas_user"))["token"]
            }
        }
    }
    else {
        return null;
    }
}

export const createPostAuthConfig = () => {
    axios.interceptors.request.use(
        (config) => {

            if (sessionStorage.getItem("elas_user") !== null) {
                config.headers['Authorization'] = "Bearer " + JSON.parse(sessionStorage.getItem("elas_user"))["token"]
            }

            return config;
        })
    }

