import React, {useEffect} from 'react';
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
import {get, isEmpty} from 'lodash';
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
    },
    inputRoot: {
        '&$disabled': {
            color: 'black'
        }
    },
    disabled: {}
}));

const RegisterCompanyAsAdmin = ({
    deleteCompanyAsAdminRequested,
    getCompanyAsAdminRequested,
    company
}) => {
    const classes = useStyles();

    const [data, setData] = React.useState(
        {
            _id: '',
            company_doc_type: '',
            company_doc_number: ''
        }
    );
    const [dataToModify, setDataToModify] = React.useState(
        {
            _id: get(company, '_id', ''),
            company_name: get(company, 'company_name', ''),
            company_mail: get(company, 'company_mail', '')
        }
    );

    useEffect(() => {
        if (!isEmpty(get(company, '_id')) && !isEmpty(get(company, 'company_name')) && !isEmpty(get(company, 'company_mail'))) {
            setDataToModify({
                _id: get(company, '_id', ''),
                company_name: get(company, 'company_name', ''),
                company_mail: get(company, 'company_mail', '')
            });
        }
    }, [company]);

    const handleChangeModified = event => {
        setDataToModify({...dataToModify, [event.target.name]: event.target.value});
    };

    const handleChange = event => {
        setData({...data, [event.target.name]: event.target.value});
    };

    const handleRegister = e => {
        e.preventDefault();
        deleteCompanyAsAdminRequested({...dataToModify});
    };

    const handleSearch = e => {
        e.preventDefault();
        getCompanyAsAdminRequested({...dataToModify});
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
                    className="mt-5 mb-3"
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
                    Eliminar - compañía
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
                                disabled
                                autoComplete="fname"
                                name="company_name"
                                variant="outlined"
                                required
                                fullWidth
                                id="company_name"
                                label="Nombre de la compañía"
                                value={get(dataToModify, 'company_name')}
                                autoFocus
                                onChange={e => handleChangeModified(e)}
                                InputProps={{
                                    classes: {
                                        root: classes.inputRoot,
                                        disabled: classes.disabled
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                disabled
                                autoComplete="fname"
                                name="company_mail"
                                variant="outlined"
                                required
                                fullWidth
                                id="company_mail"
                                label="E-mail de la compañía"
                                value={get(dataToModify, 'company_mail')}
                                autoFocus
                                onChange={e => handleChangeModified(e)}
                                InputProps={{
                                    classes: {
                                        root: classes.inputRoot,
                                        disabled: classes.disabled
                                    }
                                }}
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
                        Eliminar
                    </Button>
                </form>
            </div>
        </Container>
    );
};

const mapStateToProps = state => ({
    company: fromState.Session.getCompany()(state)
});

const {
    deleteCompanyAsAdminRequested,
    getCompanyAsAdminRequested
} = SessionActions;

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators({
        deleteCompanyAsAdminRequested,
        getCompanyAsAdminRequested
    }, dispatch)
)(RegisterCompanyAsAdmin);
