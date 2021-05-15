import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import {setStatusMessage} from '@core/state/Session/actions';
import fromState from '@selectors';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props}/>;
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2)
        },
        '& .MuiAlert-message': {
            fontSize: '17px'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '25px'
        }
    },
    snackBar: {
        top: '50px'
    }
}));

const normalizeSeverity = status => {
    if (status === 'updated') {
        return 'success';
    }
    return status;
};

export default function Toast() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {status, message} = useSelector(fromState.Session.getStatusMessage);
    const severity = normalizeSeverity(status);
    const isOpen = !isEmpty(status);
    const handleClose = () => dispatch(setStatusMessage('', ''));
    if (!severity) {
        return null;
    }
    return (
        <div className={classes.root}>
            <Snackbar
                className={classes.snackBar}
                open={isOpen}
                autoHideDuration={8000}
                onClose={handleClose}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert onClose={handleClose} severity={severity}>
                    {message || status}
                </Alert>
            </Snackbar>
        </div>
    );
}
