import {getSelectedLecturesResultsByLectureId} from "./requests";


export const onSelectCourse = (lecture_id, executeFunc) => {
    getSelectedLecturesResultsByLectureId(lecture_id, executeFunc)
}