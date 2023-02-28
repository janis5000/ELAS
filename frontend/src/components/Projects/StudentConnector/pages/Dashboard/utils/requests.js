import {defaultGet} from "../../../utils/requests/BackendRequests";
import {isEmptyList} from "../../../utils/dataOperations/DataStructureOperations";

const getLectureMembersRequest = (profileCourses, executeFuncAtRequest) => {
    let path = "lectures-with-member-by-id?";
    profileCourses.forEach((x) => (path += "id=" + x.id + "&"));
    defaultGet(path, executeFuncAtRequest)
};

export const getLectureMembers = (profile, executeFuncAtRequest) => {
    if(profile !== undefined && !isEmptyList(profile.courses)) {
        getLectureMembersRequest(profile.courses, executeFuncAtRequest);
    }
}