import React from 'react';
import PropTypes from 'prop-types';
import {connect, useDispatch} from 'react-redux';
import fromState from '@selectors';
import PackageJson from '@root/package.json';
import get from 'lodash/get';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import {fade, makeStyles} from '@material-ui/core/styles';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6)
    }
}));

const Footer = ({}) => {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
                QChain
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Something here to give the footer a purpose!
            </Typography>
            <Copyright/>
        </footer>
    );
};

const mapStateToProps = state => {
};

Footer.propTypes = {
};

export default connect(
    mapStateToProps
)(Footer);
