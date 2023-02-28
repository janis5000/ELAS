import {defaultGet} from "../../../utils/requests/BackendRequests";

export const getStudyPrograms = (executeFunc) => {
    getStudyProgramsRequest(executeFunc)
}

const getStudyProgramsRequest = (setStudyPrograms) => {
    defaultGet("study-programs", setStudyPrograms)
}

export const getLecturesByDegreeId = (degree_id, executeFunc) => {
    getLecturesByDegreeIdRequest(degree_id, executeFunc)
}

const getLecturesByDegreeIdRequest = (degree_id, executeFunc) => {
    defaultGet("lectures?studyprogram-id=" + degree_id, executeFunc)
}

export const getSelectedLecturesResultsByLectureId = (lecture_id, executeFunc) => {
    getSelectedLecturesResultsByLectureIdRequest(lecture_id, executeFunc)
}

const getSelectedLecturesResultsByLectureIdRequest = (lecture_id, executeFunc) => {
    defaultGet("lecture/" + lecture_id, executeFunc)
}


export const getLecturesByStudyProgramId = (id, setLectures) => {
    getLecturesByStudyProgramIdRequest(id, setLectures)
}

const getLecturesByStudyProgramIdRequest = (id, executeFunc) => {
    defaultGet("lectures?studyprogram-id=" + id, executeFunc)
}




