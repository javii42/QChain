/* global window, localStorage */
import React, {
    useEffect,
    useState
} from 'react';
import Avatar from '@material-ui/core/Avatar';
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
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
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
    Button,
    Row,
    Media,
    Col,
    Label,
    UncontrolledTooltip
} from 'reactstrap';
import fromState from '@selectors';
import {
    SessionActions
} from '@actions';
import {
    get, map, random, forEach
} from 'lodash';
import Dropdown from '@components/common/Dropdown';
import InputDate from '@components/common/InputDate';
// import CalendarPicker from '@components/common/CalendarPicker';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faAngleDoubleDown,
    faCheckCircle,
    faTimesCircle,
    faCheckSquare,
    faCalendarCheck,
    faPen
} from '@fortawesome/free-solid-svg-icons';
import TableList from '@components/common/TableList';
import classNames from 'classnames';

import {
    faSquare
} from '@fortawesome/free-regular-svg-icons';
import Logo from '../../images/logo_2.png';

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
        backgroundColor: '#cba9dc',
        '&:hover': {
            background: '#cba9dc'
        }
    }
}));

const getIcon = info => {
    if (info.status) {
        return faCheckCircle;
    }
    return faTimesCircle;
};

function Shift({
    user,
    branch,
    sector,
    employees,
    branchRequested,
    sectorRequested,
    employeeRequested,
    shiftRequested,
    setModalType,
    registerRequested
}) {
    const classes = useStyles();

    return (
        <Row className="m-0">
            <Col className="text-center m-5">
                <div
                    className="float-left h5"
                >
                    Agenda - [Branch] - [employee-name]
                </div>
                <div
                    className="float-right h5"
                >
                    <Button className="react-btn">
                        FECHAS ESPECIALES
                    </Button>
                </div>
                <TableList
                    information={[
                        {
                            id: '1',
                            day_week: 'Lunes',
                            status: true,
                            start: '12:00',
                            end: '18:00',
                            threadShift: '1',
                            maxShifts: '16',
                            duration: '00:30'
                        },
                        {
                            id: '2',
                            day_week: 'Martes',
                            status: true,
                            start: '12:00',
                            end: '18:00',
                            threadShift: '1',
                            maxShifts: '16',
                            duration: '00:30'
                        },
                        {
                            id: '3',
                            day_week: 'Miercoles',
                            status: false,
                            start: '12:00',
                            end: '18:00',
                            threadShift: '1',
                            maxShifts: '16',
                            duration: '00:30'
                        },
                        {
                            id: '4',
                            day_week: 'Jueves',
                            status: false,
                            start: '12:00',
                            end: '18:00',
                            threadShift: '1',
                            maxShifts: '16',
                            duration: '00:30'
                        }
                    ]}
                    primaryKey="id"
                    headers={[
                        {label: 'Dia de la semana'},
                        {label: 'Activo'},
                        {label: 'Inicio'},
                        {label: 'Fin'},
                        {label: 'Turnos simultaenos'},
                        {label: 'Cantidad max. Turnos'},
                        {label: 'Duracion del turno'},
                        {label: ''}
                    ]}
                    columns={[
                        {
                            draw: true,
                            text: 'Dia de la semana',
                            label: 'day_week'
                        },
                        {
                            draw: true,
                            text: 'Activo',
                            label: info => (
                                <>
                                    <FontAwesomeIcon
                                        icon={getIcon(info)}
                                        size="2x"
                                    />
                                </>
                            )
                        },
                        {
                            draw: true,
                            text: 'Inicio',
                            label: 'start'
                        },
                        {
                            draw: true,
                            text: 'Fin',
                            label: 'end'
                        },
                        {
                            draw: true,
                            text: 'Turnos simultaneos',
                            label: 'threadShift'
                        },
                        {
                            draw: true,
                            text: 'Cantidad max. Turnos',
                            label: 'maxShifts'
                        },
                        {
                            draw: true,
                            text: 'Duracion del turno',
                            label: 'duration'
                        },
                        {
                            draw: true,
                            text: 'Estado',
                            label: () => (
                                <>
                                    <FontAwesomeIcon
                                        icon={faPen}
                                        size="2x"
                                    />
                                </>
                            )
                        }
                    ]}
                />
            </Col>
        </Row>
    );
}

const {
    branchRequested,
    sectorRequested,
    employeeRequested,
    shiftRequested
} = SessionActions;

const mapStateToProps = state => ({
    user: fromState.Session.getUser()(state),
    branch: fromState.Session.getBranch()(state),
    sector: fromState.Session.getSector()(state),
    employees: fromState.Session.getEmployees()(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    branchRequested,
    sectorRequested,
    employeeRequested,
    shiftRequested
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Shift);
