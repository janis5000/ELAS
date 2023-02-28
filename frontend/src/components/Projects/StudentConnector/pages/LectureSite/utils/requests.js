import {authenticatedPost, defaultGet} from "../../../utils/requests/BackendRequests";

export const getLecturesById = (id, executeFuncAtRequest) => {
    const executeFunc = (list) => {
        executeFuncAtRequest(list[0])
    }
    getLecturesByIdRequest('lecture/' + id, executeFunc)
}

const getLecturesByIdRequest = (url, executeFuncAtRequest) => {
    defaultGet(url, executeFuncAtRequest)
}

export const getDiscussionsById = (id, executeFuncAtRequest) => {
    getDiscussionsByIdRequest(id, executeFuncAtRequest)
}

const getDiscussionsByIdRequest = (id, executeFuncAtRequest) => {
    defaultGet("discussions/" + id, executeFuncAtRequest)
}


export const postDiscussionById = (id, data, setDiscussions, clearTextFields, authConfig) => {
    const executeFunc = () => {
        const onSetDiscussion = (val) => {
            setDiscussions(val)
        }
        getDiscussionsByIdRequest(id, onSetDiscussion)
        clearTextFields();
    }
    postDiscussionByIdRequest(id, data, executeFunc, authConfig);
};

const postDiscussionByIdRequest = (id, data, executeFuncAtRequest, authConfig) => {
    authenticatedPost("start-discussion", data, executeFuncAtRequest, () => {
    }, authConfig);
}

export const createNewChatById = (recipientId, authConfig) => {
    createNewChatByIdRequest({"recipient_id": recipientId}, authConfig)
}

const createNewChatByIdRequest = (data, authConfig) => {
    authenticatedPost("create-chatroom", data, () => {
    }, () => {
    }, authConfig)
}

export const postCommentById = (discussion_id, data, setDiscussions, clearTextFields, authConfig) => {
    const executeFunc = (res) => {
        clearTextFields();
        setDiscussions(prevState => {
            let prevDiscussions = [...prevState]
            for (let i = 0; i < prevDiscussions.length; i++) {
                if (prevDiscussions[i].discussion_id === discussion_id) {
                    prevDiscussions[i] = res
                }
            }
            setDiscussions(prevDiscussions)
        })
    }
    postCommentByIdRequest(data, executeFunc, authConfig)
}

const postCommentByIdRequest = (data, executeFunc, authConfig) => {
    authenticatedPost("add-comment", data, executeFunc, () => {
    }, authConfig)
}