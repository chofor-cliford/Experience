import { makeStyles } from "@material-ui/core";

export default makeStyles (() => ({
    commentsOuterContainer: {
        display: 'flex',
        justifyContent: 'space-between',

    },
    commentsInnerContainer: {
        height: '200px',
        overflowY: 'auto',
        marginRight: '30px'
    },
}));


