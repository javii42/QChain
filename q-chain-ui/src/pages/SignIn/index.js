import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
    Media
} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    SessionActions
} from '@actions';
import fromState from '@selectors';
import Logo from '../../images/logo.png';


const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#7d2a84',
        '&:hover': {
            background: '#7d2a84'
        }
    }
}));

const SignUp = ({
    signInRequested,
    setModalType
}) => {
    const classes = useStyles();
    const [user, setUser] = useState();
    const [password, setPassword] = useState();

    const handleRegister = () => {
        setModalType('register');
    };
    const handleSignIn = e => {
        e.preventDefault();
        signInRequested({user_mail: user, user_password: password});
        setModalType('hide');
    };

    const handleUserOrPassword = (value, field = false) => {
        if (field === 'user') {
            return setUser(value);
        }
        return setPassword(value);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Media
                    src={Logo}
                    style={{
                        height: '70px',
                        width: '70px'
                    }}
                    className="mt-3 mb-3"
                />
                <Typography component="h1" variant="h5">
                    Iniciar sesión
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Ingresa tu mail"
                                name="email"
                                autoComplete="email"
                                onChange={event => {
                                    event.preventDefault();
                                    const {value} = event.target;
                                    handleUserOrPassword(value, 'user');
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Ingresa tu contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={event => {
                                    event.preventDefault();
                                    const {value} = event.target;
                                    handleUserOrPassword(value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                label="Recordarme"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={e => handleSignIn(e)}
                    >
                        Ingresar
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link
                                href="#"
                                onClick={() => handleRegister()}
                                variant="body2"
                            >
                                No tenes cuenta?
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Olvidaste tu contraseña?
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

const {
    signInRequested
} = SessionActions;

const mapStateToProps = state => {
};

const mapDispatchToProps = dispatch => bindActionCreators({
    signInRequested
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
