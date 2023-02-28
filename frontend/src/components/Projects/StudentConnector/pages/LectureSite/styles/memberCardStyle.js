import {makeStyles} from "@material-ui/core/styles";

export const memberCardStyle = makeStyles((theme) => ({
    profilePicture: {
        width: theme.spacing(24),
        height: theme.spacing(24)
    },
    cardMediaMember: {
        paddingTop: '5.25%',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    }
}));