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

const RegisterCompanyAsAdmin = ({
    registerCompanyAsAdminRequested
}) => {
    const classes = useStyles();

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [data, setData] = React.useState(
        {
            _id: '',
            company_name: '',
            company_mail: '',
            company_doc_type: '',
            company_doc_number: ''
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
        registerCompanyAsAdminRequested({...data});
    };

    const handleSearch = e => {
        e.preventDefault();
        setData({...data, company_name: 'TEST COMPANY', company_mail: 'test@company.com'});
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
                    Editar - compañía
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                name="_id"
                                label="ID"
                                type="text"
                                id="_id"
                                autoComplete="current-password"
                                onChange={e => handleChange(e)}
                            />
                            <InputLabel/>
                            <InputLabel id="demo-simple-select-helper-label">
                                Razón social
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                name="company_doc_type"
                                value={get(data, 'company_doc_type')}
                                onChange={e => handleChange(e)}
                            >
                                <MenuItem value="1">CUIT</MenuItem>
                                <MenuItem value="2">CUIL</MenuItem>
                            </Select>
                            <TextField
                                variant="outlined"
                                required
                                name="company_doc_number"
                                label="Nº de CUIL"
                                type="text"
                                id="repeatPassword"
                                autoComplete="current-password"
                                onChange={e => handleChange(e)}
                            />
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={e => handleSearch(e)}
                        >
                            Buscar
                        </Button>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="company_name"
                                variant="outlined"
                                required
                                fullWidth
                                id="company_name"
                                label="Nombre de la compañía"
                                value={get(data, 'company_name')}
                                autoFocus
                                onChange={e => handleChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="company_mail"
                                variant="outlined"
                                required
                                fullWidth
                                id="company_mail"
                                label="E-mail de la compañía"
                                value={get(data, 'company_mail')}
                                autoFocus
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
    registerCompanyAsAdminRequested
} = SessionActions;

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators({
        registerCompanyAsAdminRequested
    }, dispatch)
)(RegisterCompanyAsAdmin);
