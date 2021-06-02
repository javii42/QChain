/* global localStorage, window */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {
    withRouter,
    Link
} from 'react-router-dom';
import {
    Media
} from 'reactstrap';
import {connect} from 'react-redux';
import clsx from 'clsx';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import ModalWithDynamicButtons from '@components/common/ModalWithDynamicButtons';
import SignIn from '@pages/SignIn';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Register from '@pages/Register';
import {
    SessionActions
} from '@actions';
import get from 'lodash/get';
import {has, isPlainObject, isString} from 'lodash';
import fromState from '@selectors';
import {
    mainListItems,
    mainListItemsAdmin,
    mainListItemsAdminEmployee,
    secondaryListItems
} from './listItems';
import Logo from '../images/logo.png';

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto'
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch'
        }
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex'
        }
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    appBar: {
        backgroundColor: '#7d2a84'
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
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState('login');
    const [logOut, setLogout] = useState(false);
    const [sessionModal, setSessionModal] = useState(false);
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

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

    return (
        <>
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, open && classes.appBarShift)}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon
                            style={{
                                height: '40px',
                                width: '40px'
                            }}
                        />
                    </IconButton>
                    <Media
                        src={Logo}
                        style={{
                            height: '70px',
                            width: '70px'
                        }}
                        className="mt-3 mb-3"
                    />
                    <Typography
                        className={`${classes.title} mt-4`}
                        variant="h6"
                        noWrap
                    >
                        QChain System
                    </Typography>
                    <div className={classes.grow}/>
                    <div className={classes.sectionDesktop}>
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
                            onClick={!token ? () => handleLoginModal(true) : () => handleLogOutModal(true)}
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
                        {getParsedUser(user) && (
                            <div>
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
                            </div>
                        ) }
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
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
            </Drawer>
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
        </>
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
