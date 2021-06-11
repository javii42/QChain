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
import {useHistory} from 'react-router-dom';
import {
    Row,
    Col,
    Media
} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
    faSquare
} from '@fortawesome/free-regular-svg-icons';
import {
    faAngleDoubleDown,
    faCheckCircle,
    faTimesCircle,
    faCheckSquare,
    faSearch,
    faClock,
    faBriefcase,
    faPuzzlePiece
} from '@fortawesome/free-solid-svg-icons';
import Logo from '../images/logo.png';
import DataFiscal from '../images/data_fiscal.jpg';

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
    },
    specialFooter: {
        backgroundColor: '#cba9dc',
        padding: theme.spacing(5),
        minHeight: '37vh',
        display: 'flex'
    }
}));

const Footer = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = get(history, 'location.pathname');

    if (location === '/') {
        return (
            <footer className={classes.specialFooter}>
                <Row className="text-center pl-5 pr-5">

                    <Col className="m-2">
                        <FontAwesomeIcon
                            color="white"
                            className="pb-2"
                            icon={faSearch}
                            size="3x"
                        />
                        <p className="h5 pt-4 pb-4 purple-title font-weight-bold">Encontrá</p>
                        <p className="gray-text pt-4 pb-4">La empresa que mejor se adapte a tus necesidades</p>
                        <Link href="" className="mt-5 purple-link "> Más información </Link>
                    </Col>
                    <Col className="gray-line m-2">
                        <FontAwesomeIcon
                            color="white"
                            className="pb-2"
                            icon={faClock}
                            size="3x"
                        />
                        <p className="h5 pt-4 pb-4 purple-title font-weight-bold">Organizá</p>
                        <p className="gray-text pt-4 pb-4">Tus tiempos, eligiendo el turno que mejor se adapte a vos.</p>
                        <Link href="" className="p-5 purple-link "> Más información </Link>
                    </Col>

                    <Col className="gray-line m-2">
                        <FontAwesomeIcon
                            color="white"
                            className="pb-2"
                            icon={faBriefcase}
                            size="3x"
                        />
                        <p className="h5 pt-4 pb-4 purple-title font-weight-bold">Resolvé</p>
                        <p className="gray-text pt-4 pb-4">Tus necesidades, de la forma más rápida, cómoda y segura.</p>
                        <Link href="" className="p-5 purple-link "> Más información </Link>
                    </Col>

                    <Col className="gray-line m-2">
                        <FontAwesomeIcon
                            color="white"
                            className="pb-2"
                            icon={faPuzzlePiece}
                            size="3x"
                        />
                        <p className="h5 pt-4 pb-4 purple-title font-weight-bold">Ayudá</p>
                        <p className="gray-text pt-4 pb-4">Contanos tu experiencia y calificá la atención. Para que todos podamos elegir mejor.</p>
                        <Link href="" className="p-5 purple-link "> Más información </Link>
                    </Col>
                    <div className="icon-position mr-3 ml-2 mt-5" >
                        <Media
                            src={Logo}
                            style={{
                                height: '40px',
                                width: '40px',
                                display: 'inline-block'
                            }}
                            className="mr-5"
                        />
                        <Media
                            src={DataFiscal}
                            style={{
                                height: '50px',
                                width: '50px',
                                display: 'inline-block'
                            }}
                        />
                    </div>
                </Row>
            </footer>
        );
    }

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
