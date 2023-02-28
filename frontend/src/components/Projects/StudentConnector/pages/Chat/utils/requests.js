import {authenticatedGet, authenticatedPost} from "../../../utils/requests/BackendRequests";

export const getChatsOfUser = (setChats, authConfig) => {
    getChatsOfUserRequest(setChats, authConfig)
}

const getChatsOfUserRequest = (setChats, authConfig) => {
    authenticatedGet("chats", setChats, authConfig)
}

export const sendMessageToChatId = (id, data, setSnackBarMessage, setOpenSnackbar, authConfig) => {
    const executeFunc = () => {
        setSnackBarMessage("Successfully sent message!")
        setOpenSnackbar(true)
    }
    sendMessageToChatIdRequest(id, data, executeFunc, authConfig)
}

const sendMessageToChatIdRequest = (id, data, executeFunc, authConfig) => {
    authenticatedPost("send-message/" + id, data, executeFunc, () => {
    }, authConfig)
}

export const getChatsAndSetChatWithUserIdToUnread = (recipientId, setChats, setSelectedChat, authConfig) => {
    const executeFunc = (res) => {
        setChats(prevState => {
            let prevChats = [...prevState]
            for (let i = 0; i < prevChats.length; i++) {
                if (prevChats[i].recipient_user.id === recipientId) {
                    prevChats[i].unread_messages = 0
                    setSelectedChat(res[0]);
                }
            }
            setChats(prevChats);
        })
    }
    getChatsAndSetChatWithUserIdToUnreadRequest(recipientId, executeFunc, authConfig)
}

const getChatsAndSetChatWithUserIdToUnreadRequest = (recipientId, executeFunc, authConfig) => {
    authenticatedGet("chatroom?id=" + recipientId, executeFunc, authConfig);
}