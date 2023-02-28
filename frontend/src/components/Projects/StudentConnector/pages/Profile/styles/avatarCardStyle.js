import {makeStyles} from "@material-ui/core";

export const avatarCardStyle = makeStyles((theme) => ({
    root: {
        'display': 'block',
        'flexWrap': 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            height: theme.spacing(35),
        },
    },
    large: {
        width: theme.spacing(17),
        height: theme.spacing(17),
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileName: {
        color: '#000000',
        lineHeight: 1.5,
    },
}));