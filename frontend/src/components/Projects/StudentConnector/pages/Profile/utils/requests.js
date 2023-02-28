import {authenticatedPost, defaultGet} from "../../../utils/requests/BackendRequests";

export const getStudyPrograms = (executeFuncAtRequest) => {
    const executeFuncReq = (res, param) => {
        executeFuncAtRequest({
            ...param,
            degrees: res
        })
    }
    getStudyProgramsRequest(executeFuncReq)
}

const getStudyProgramsRequest = (executeFunc) => {
    defaultGet("study-programs", executeFunc)
}

export const getCurrentProfileById = (id, setCurrentProfile, setCurrentSkills) => {
    const executeFuncReq = (res) => {
        setCurrentProfile(res)
        setCurrentSkills(res.skills)
    }
    getCurrentProfileByIdRequest(id, executeFuncReq)
}

const getCurrentProfileByIdRequest = (id, executeFunc) => {
    defaultGet("profile/" + id, executeFunc)
}

export const getAllSkillsOfUser = (setAllSkills, currentProfile) => {
    const executeFuncReq = (res) => {
        res = res.filter(x => !currentProfile.skills?.map(y => y.id).includes(x.id))
        setAllSkills(res);
    }
    getAllSkillsOfUserRequest(executeFuncReq)
}

const getAllSkillsOfUserRequest = (executeFunc) => {
    defaultGet("skills", executeFunc)
}

export const postProfileData = (profile_id, data, setSuccess, setOpenSnackbar, setSnackBarMessage, authConfig) => {
    const executeFuncSuccess = () => {
        setSuccess(true);
        setOpenSnackbar(true);
        setSnackBarMessage("Profile Updated!");
    }
    const execFuncError = () => {
        setSuccess(false);
        setOpenSnackbar(true);
        setSnackBarMessage("An error occured. Profile not updated");
    }
    postProfileDataRequest(profile_id, data, executeFuncSuccess, execFuncError, authConfig)
};

const postProfileDataRequest = (profile_id, data, executeFuncSuccess, executeFuncErr, authConfig) => {
    authenticatedPost("profile/" + profile_id, data, executeFuncSuccess, executeFuncErr, authConfig)
}