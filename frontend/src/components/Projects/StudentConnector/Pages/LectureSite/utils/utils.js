import {Typography} from "@material-ui/core";
import {createNewChatById} from "./requests";

export const profileHasCourse = (id, profile) => {
    let p = profile?.courses?.filter((x) => x.id === id);
    if (p != null) {
        return p.length > 0;
    } else {
        return false;
    }
};


export const getTime = (textObjectCreation) => {
    let timeDelta = Date.now() - Date.parse(textObjectCreation);
    if (timeDelta < 1000 * 60) {
        return (
            <Typography style={{ color: "gray", fontWeight: 100, fontSize: 12 }}>
                {Math.round(timeDelta / 1000) + "seconds ago"}
            </Typography>
        );
    } else if (timeDelta < 1000 * 60 * 60) {
        return (
            <Typography style={{ color: "gray", fontWeight: 100, fontSize: 12 }}>
                {Math.round(timeDelta / (1000 * 60)) + "minutes ago"}
            </Typography>
        );
    } else if (timeDelta < 1000 * 60 * 60 * 24) {
        return (
            <Typography style={{ color: "gray", fontWeight: 100, fontSize: 12 }}>
                {Math.round(timeDelta / (1000 * 60 * 60)) + "hours ago"}
            </Typography>
        );
    } else if (timeDelta > 1000 * 60 * 60 * 24) {
        return (
            <Typography style={{ color: "gray", fontWeight: 100, fontSize: 12 }}>
                {Math.round(timeDelta / (1000 * 60 * 60 * 24)) + "days ago"}
            </Typography>
        );
    }
};

export const showAllComments = (id, setDiscussions) => {
    setDiscussions(prevState => {
        let prevDiscussions = [...prevState]
        prevDiscussions.forEach(x => {
            if (x.discussion_id === id) {
                x.show_all = true;
            }
        })
        setDiscussions(prevDiscussions)
    })
}

export const hideAllComments = (id, setDiscussions) => {
    setDiscussions(prevState => {
        let prevDiscussions = [...prevState]
        prevDiscussions.forEach(x => {
            if (x.discussion_id === id) {
                x.show_all = false;
            }
        })
        setDiscussions(prevDiscussions)
    })
}