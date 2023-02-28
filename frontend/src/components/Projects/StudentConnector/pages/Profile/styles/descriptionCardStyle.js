import {makeStyles} from "@material-ui/core";

export const descriptionCardStyle = makeStyles((theme) => ({
    root: {
        display: "block",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(1),
            height: theme.spacing(35),
        },
        width: '100%'
    },
    center: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    saveAbout: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "right",
        verticalAlign: "text-bottom",
        marginTop: 15,
    },
    profileDescription: {
        color: "#000000",
        lineHeight: 1.5,
    },
    textarea: {
        backgroundColor: "transparent",
        border: 0,
        borderColor: "#303f9f",
        padding: "8px",
        width: "100%",
    },
}));