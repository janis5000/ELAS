import {makeStyles} from "@material-ui/core/styles";

export const mainStyle = makeStyles((theme) => ({
    profilePicture: {
        width: theme.spacing(24),
        height: theme.spacing(24),
    },
    text: {
        fontFamily: "Roboto",
        color: "black",
        display: "inline",
        maxHeight: "50%",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        width: 10,
        maxWidth: 10,
    },
}));
