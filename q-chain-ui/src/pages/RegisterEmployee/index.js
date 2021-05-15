import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from '@material-ui/pickers';
import {
    Media
} from 'reactstrap';
import {SessionActions} from '@actions';
import {get} from 'lodash';
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

const RegisterEmployee = ({
    registerEmployeeAsAdminRequested
}) => {
    const classes = useStyles();

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [data, setData] = React.useState(
        {
            company_id: '609587983ec419a0f7b9126e',
            user_id: '609f601a3df68bb12b79694a',
            user_mail: '',
            user_password: '',
            user_name: '',
            user_lastname: '',
            user_birthday: '',
            user_doc_type: '',
            user_doc_number: ''
        }
    );


    const handleChange = event => {
        setData({...data, [event.target.name]: event.target.value});
    };

    const handleDateChange = date => {
        setSelectedDate(date);
        setData({...data, user_birthday: date});
    };

    const handleRegister = e => {
        e.preventDefault();
        registerEmployeeAsAdminRequested({...data});
    };

    return (
        <Container >
            <CssBaseline/>
            <div
                className={classes.paper}
            >
                <Media
                    style={{
                        height: '25px',
                        width: '25px'
                    }}
                    className="mt-3 mb-3"
                />
                <Media
                    src={Logo}
                    style={{
                        height: '60px',
                        width: '60px'
                    }}
                    className="mt-3 mb-3"
                />
                <Typography component="h1" variant="h5">
                    Registrar un empleado
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="user_name"
                                variant="outlined"
                                required
                                fullWidth
                                id="user_name"
                                label="Nombre"
                                autoFocus
                                onChange={e => handleChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="user_lastname"
                                label="Apellido"
                                name="user_lastname"
                                autoComplete="lname"
                                onChange={e => handleChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="user_mail"
                                label="Correo electrónico"
                                name="user_mail"
                                autoComplete="email"
                                onChange={e => handleChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="user_password"
                                label="Contraseña"
                                type="password"
                                id="user_password"
                                autoComplete="current-password"
                                onChange={e => handleChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="repeatPassword"
                                label="Confirmar contraseña"
                                type="password"
                                id="repeatPassword"
                                autoComplete="current-password"
                                onChange={e => handleChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Cumpleaños"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date'
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel id="demo-simple-select-helper-label">
                                Tipo de documento
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                name="user_doc_type"
                                value={get(data, 'user_doc_type')}
                                onChange={e => handleChange(e)}
                            >
                                <MenuItem value="1">LIBRETA CÍVICA</MenuItem>
                                <MenuItem value="2">LIBRETA DE ENROLAMIENTO</MenuItem>
                                <MenuItem value="3">DNI</MenuItem>
                            </Select>
                            <TextField
                                variant="outlined"
                                required
                                name="user_doc_number"
                                label="Nº de documento"
                                type="text"
                                id="repeatPassword"
                                autoComplete="current-password"
                                onChange={e => handleChange(e)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={e => handleRegister(e)}
                    >
                        Enviar
                    </Button>
                </form>
            </div>
        </Container>
    );
};

const mapStateToProps = state => ({});

const {
    registerEmployeeAsAdminRequested
} = SessionActions;

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators({
        registerEmployeeAsAdminRequested
    }, dispatch)
)(RegisterEmployee);
