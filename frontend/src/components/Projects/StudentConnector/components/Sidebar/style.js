import {makeStyles} from "@material-ui/core/styles";

export const style = makeStyles((theme) => ({
    drawer: {
        position: "relative",
        zIndex: theme.zIndex.appBar - 1
    },
    list: {
        width: 250,
        overflowX: 'hidden'
    },
    fullList: {
        width: "auto",
    },
    menuButton: {},
    text: {
        fontFamily: "Roboto",
        color: "black",
        margin: 10,
    },
    icon: {
        marginTop: 64,
        marginLeft: 8,
    },
    container: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing()
    }
}));