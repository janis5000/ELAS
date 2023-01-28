import {makeStyles} from "@material-ui/core/styles";

const scStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing()
    },
    cardContainer: {
        padding: '20px 0'
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',

    },
    cardMedia: {
        paddingTop: '56.25%'
    },
    cardContent: {
        flexGrow: 1,
    },
    tabStyle:{
        backgroundColor: theme.palette.background.paper,
        color: "black"
    },
    cardGrid: {
        marginBottom: 10
    }
}))

export default scStyles;