/* global window, localStorage */
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import clsx from 'clsx';
import {fade} from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
    IconButton,
    Drawer,
    Link,
    MenuItem
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import React, {useState, useEffect} from 'react';
import {withRouter, Link as RouterLink} from 'react-router-dom';
import {
    get, has, isPlainObject, isString
} from 'lodash';
import {
    Button as rButton,
    Media,
    Col,
    Row,
    Collapse, CardBody, Card
} from 'reactstrap';
import {
    SessionActions
} from '@actions';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SignIn from '@pages/SignIn';
import Register from '@pages/Register';
import ModalWithDynamicButtons from '@components/common/ModalWithDynamicButtons';
import fromState from '@selectors';
import {
    mainListItems,
    mainListItemsAdmin,
    mainListItemsAdminEmployee,
    secondaryListItems
} from './listItems';
import Logo from '../images/logo.png';

const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: '#cba9dc',
        paddingRight: '79px',
        paddingLeft: '118px',
        '@media (max-width: 900px)': {
            paddingLeft: 0
        }
    },
    logo: {
        fontFamily: 'Work Sans, sans-serif',
        fontWeight: 600,
        color: '#FFFEFE',
        textAlign: 'left'
    },
    menuButton: {
        fontFamily: 'Open Sans, sans-serif',
        fontWeight: 700,
        size: '18px',
        marginLeft: '38px'
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    drawerContainer: {
        padding: '20px 30px'
    },
    title: {
        flexGrow: 1,
        marginTop: 5,
        textDecoration: 'none !important',
        boxShadow: 'none',
        color: '#fff !important'
    },
    section: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex'
        }
    }
}));

const getParsedUser = user => {
    if (user && isString(user)) {
        return JSON.parse(user);
    }
    if (user && isPlainObject(user)) {
        return user;
    }
    return false;
};

const getRole = user => {
    const parsedUser = getParsedUser(user);
    return get(parsedUser, 'rol');
};

const Header = ({
    requestSignOut,
    registerRequested
}) => {
    const {
        header,
        logo,
        menuButton,
        toolbar,
        drawerContainer,
        title,
        section
    } = useStyles();

    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState('login');
    const [logOut, setLogout] = useState(false);
    const [sessionModal, setSessionModal] = useState(false);
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false
    });

    const handleLoginModal = value => {
        setOpenModal(value);
        setModalType('login');
    };

    const handleLogOutModal = value => {
        setLogout(value);
    };

    const handleLogOut = () => {
        handleLogOutModal(false);
        localStorage.clear();
        window.location = '/';
    };

    useEffect(() => {
        token = localStorage.getItem('token');
        user = localStorage.getItem('user');
    }, []);

    const {mobileView, drawerOpen} = state;
    const handleDrawerOpen = () => setState(prevState => ({...prevState, drawerOpen: true}));
    const handleDrawerClose = () => setState(prevState => ({...prevState, drawerOpen: false}));

    useEffect(() => {
        const setResponsiveness = () => (window.innerWidth < 900
            ? setState(prevState => ({...prevState, mobileView: true}))
            : setState(prevState => ({...prevState, mobileView: false})));

        setResponsiveness();

        window.addEventListener('resize', () => setResponsiveness());

        return () => {
            window.removeEventListener('resize', () => setResponsiveness());
        };
    }, []);

    const femmecubatorLogo = (
        <Typography
            variant="h6"
            component="h1"
            className={logo}
        >
            QChain System
        </Typography>
    );

    const getDrawerChoices = () => (
        <>
            <div>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon/>
                </IconButton>
            </div>
            <Divider/>
            <List>{getRole(user) === 'sysAdmin' && mainListItemsAdmin}</List>
            <List>{getRole(user) === 'companyAdmin' && mainListItemsAdminEmployee}</List>
            <List>{getRole(user) !== 'sysAdmin' && getRole(user) !== 'companyAdmin' && mainListItems}</List>
            <Divider/>
            <List>{secondaryListItems}</List>
        </>
    );

    const getMenuButtons = () => (
        <div className={section}>
            <IconButton color="inherit">
                <Badge color="secondary">
                    <NotificationsIcon
                        style={{
                            height: '35px',
                            width: '35px'
                        }}
                    />
                </Badge>
            </IconButton>
            <IconButton
                color="inherit"
                onClick={!token ? () => handleLoginModal(true) : () => toggle()}
            >
                <Badge color="secondary">
                    <SupervisedUserCircleIcon
                        style={{
                            height: '35px',
                            width: '35px'
                        }}
                    />
                </Badge>
            </IconButton>
        </div>
    );

    const displayDesktop = () => (
        <Toolbar className={toolbar}>
            <IconButton
                {...{
                    edge: 'start',
                    color: 'inherit',
                    'aria-label': 'menu',
                    'aria-haspopup': 'true',
                    onClick: handleDrawerOpen
                }}
                className="float-left"
            >
                <MenuIcon/>
            </IconButton>
            <a
                href="/"
            >
                <Media
                    src={Logo}
                    style={{
                        height: '25px',
                        width: '25px'
                    }}
                    className="ml-2 mt-2 mb-3 mr-2"
                />
            </a>
            <Typography
                variant="h5"
                className={title}
                noWrap
            >
                <Link
                    href="/"
                    underline="none"
                    className={title}
                >
                    QChain System
                </Link>
            </Typography>
            <Drawer
                {...{
                    anchor: 'left',
                    open: drawerOpen,
                    onClose: handleDrawerClose
                }}
            >
                <div className={drawerContainer}>{getDrawerChoices()}</div>
            </Drawer>
            <div>{getMenuButtons()}</div>
        </Toolbar>
    );

    const displayMobile = () => (
        <Toolbar>
            <IconButton
                {...{
                    edge: 'start',
                    color: 'inherit',
                    'aria-label': 'menu',
                    'aria-haspopup': 'true',
                    onClick: handleDrawerOpen
                }}
            >
                <MenuIcon/>
            </IconButton>
            <Media
                src={Logo}
                style={{
                    height: '25px',
                    width: '25px'
                }}
                className="ml-2 mt-2 mb-3 mr-2"
            />

            <Drawer
                {...{
                    anchor: 'left',
                    open: drawerOpen,
                    onClose: handleDrawerClose
                }}
            >
                <div className={drawerContainer}>{getDrawerChoices()}</div>
            </Drawer>

            <div>{femmecubatorLogo}</div>
        </Toolbar>
    );

    return (
        <header>
            <AppBar position="static" className={header}>
                {mobileView ? displayMobile() : displayDesktop()}
            </AppBar>
            <div>
                <Collapse isOpen={isOpen}>
                    <Card className="float-right">
                        <CardBody>
                            {getParsedUser(user) && (
                                <>
                                    <ListItem>
                                        <ListItemText primary={
                                            `PERFIL: ${get(getParsedUser(user), 'user_name')}
                                         ${get(getParsedUser(user), 'user_lastname')}
                                        `
                                        }
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            className="ml-2"
                                            primary={
                                                `ROL: ${get(getParsedUser(user), 'rol')}`
                                            }
                                        />
                                    </ListItem>
                                    <ListItem
                                        button
                                        className="ml-3"
                                        onClick={() => handleLogOutModal(true)}
                                    >
                                        <ListItemText primary="Cerrar sesion"/>
                                    </ListItem>
                                </>
                            ) }
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
            {openModal && modalType !== 'hide' && (
                <ModalWithDynamicButtons
                    message={(
                        <>
                            {modalType === 'login' && (
                                <SignIn
                                    setModalType={setModalType}
                                />
                            )}
                            {modalType === 'register' && (
                                <Register
                                    setModalType={setModalType}
                                    registerRequested={registerRequested}
                                />
                            )}
                        </>
                    )}
                    buttons={
                        [
                            {
                                onClick: () => setOpenModal(false),
                                onTouchEnd: () => setOpenModal(false),
                                className: 'd-none'
                            }

                        ]
                    }
                    buttonToggleIndex={0}
                />
            )}
            {logOut && (
                <ModalWithDynamicButtons
                    message={(
                        <>
                            Seguro que desea salir del Sistema QCHAIN?
                        </>
                    )}
                    buttons={
                        [
                            {
                                onClick: () => handleLogOut(),
                                onTouchEnd: () => handleLogOut(),
                                color: 'secondary',
                                label: 'Aceptar'
                            },
                            {
                                onClick: () => handleLogOutModal(false),
                                onTouchEnd: () => handleLogOutModal(false),
                                color: 'secondary',
                                label: 'Cancelar'
                            }
                        ]
                    }
                    buttonToggleIndex={0}
                />
            )}
        </header>
    );
};

Header.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
};

Header.defaultProps = {
    history: null
};

const mapStateToProps = state => ({
    user: fromState.Session.getUser()(state)
});

const {
    requestSignOut,
    registerRequested
} = SessionActions;

export default withRouter(connect(
    mapStateToProps,
    dispatch => bindActionCreators({
        requestSignOut,
        registerRequested
    }, dispatch)
)(Header));
