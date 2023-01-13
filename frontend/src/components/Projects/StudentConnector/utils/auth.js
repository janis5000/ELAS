export const createAuthConfig = () => {
    return {
        headers: {
            Authorization: "Bearer " + JSON.parse(sessionStorage.getItem("elas_user"))["token"]
        }
    }
}