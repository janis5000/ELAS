import {authenticatedPost} from "../../../utils/requests/backendRequests";


export const addCourseToProfile = (id, executeFuncAtRequest, lectureInfo, authConfig) => {
    const executeFunc = () => {
        let prevProfile = null;
        executeFuncAtRequest((prevState) => {
            prevProfile = { ...prevState };
            if(prevProfile.courses.filter(x => x === lectureInfo).length === 0) {
                prevProfile.courses.push(lectureInfo);
            }
            executeFuncAtRequest(prevProfile);
        });
    }
    authenticatedPost("add-course/" + id, {},executeFunc, () => {}, authConfig)
};

export const removeCourseFromProfileById = (id, executeFuncAtRequest, authConfig) => {
    const executeFunc = () => {
        let prevProfile = null;
        executeFuncAtRequest((prevState) => {
            prevProfile = { ...prevState };
            prevProfile.courses = prevProfile.courses.filter(
                (x) => x["id"] !== id
            );
            executeFuncAtRequest(prevProfile);
        });
    }
    authenticatedPost("remove-course/" + id, {}, executeFunc, () => {}, authConfig)
}