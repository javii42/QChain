/* global window, localStorage */
import React, {
    useEffect,
    useState
} from 'react';
import {useHistory} from 'react-router-dom';
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
    get, map, random, forEach, isEmpty
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
    faClock,
    faSync
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
    if (info.shift_status === 'Attended') {
        return faCalendarCheck;
    }
    if (info.shift_status === 'onHold') {
        return faClock;
    }
    return faSync;
};

function Shift({
    user,
    branch,
    sector,
    employees,
    branchRequested,
    sectorRequested,
    employeeRequested,
    shifts,
    shiftsRequested,
    setModalType,
    registerRequested,
    ...props
}) {
    const classes = useStyles();

    useEffect(() => {
        if (isEmpty(shifts)) {
            const user_id = get(props, 'match.params.id');
            shiftsRequested({user_id});
        }
    }, []);

    console.log('shifts', shifts);

    return (
        <Row className="m-0">
            <Col className="text-center m-5">
                <div
                    className="float-left h5"
                >
                    Mis turnos
                </div>
                <div
                    className="float-right h5"
                >
                    <Button className="react-btn">
                        CANCELAR TURNO/S
                    </Button>
                </div>
                <TableList
                    information={shifts}
                    /*                     information={[
                        {
                            id: '1',
                            company_id: '[Company_name]',
                            employee_id: '[employee_name]',
                            shift_start: '01-05-2021 12:00',
                            branch_address: 'Av. La Plata 1900 CABA',
                            shift_status: 'agenda',
                            checked: false
                        },
                        {
                            id: '2',
                            company_id: '[Company_name]',
                            employee_id: '[employee_name]',
                            shift_start: '01-05-2021 12:00',
                            branch_address: 'Av. La Plata 1900 CABA',
                            shift_status: 'clock',
                            checked: false
                        },
                        {
                            id: '3',
                            company_id: '[Company_name]',
                            employee_id: '[employee_name]',
                            shift_start: '01-05-2021 12:00',
                            branch_address: 'Av. La Plata 1900 CABA',
                            shift_status: 'sync',
                            checked: false
                        },
                        {
                            id: '4',
                            company_id: '[Company_name]',
                            employee_id: '[employee_name]',
                            shift_start: '01-05-2021 12:00',
                            branch_address: 'Av. La Plata 1900 CABA',
                            shift_status: 'agenda',
                            checked: false
                        }
                    ]} */
                    primaryKey="id"
                    headers={[
                        {label: ''},
                        {label: 'Empresa'},
                        {label: 'Profesional'},
                        {label: 'Fecha y hora'},
                        {label: 'Dirección'},
                        {label: 'Estado'}
                    ]}
                    columns={[
                        {
                            draw: true,
                            text: '',
                            label: info => (
                                <>
                                    <Label id={`u${info.id}`}>
                                        <input
                                            className="d-none"
                                            id={`t${info.id}`}
                                            type="checkbox"
                                        />
                                        <FontAwesomeIcon
                                            className={classNames({disabled: false})}
                                            icon={false ? faCheckSquare : faSquare}
                                            size="2x"
                                        />
                                    </Label>
                                </>
                            )
                        },
                        {
                            draw: true,
                            text: 'Empresa',
                            label: 'company_name'
                        },
                        {
                            draw: true,
                            text: 'Profesional',
                            label: 'employee_name'
                        },
                        {
                            draw: true,
                            text: 'Fecha y hora',
                            label: 'shift_start'
                        },
                        {
                            draw: true,
                            text: 'Dirección',
                            label: 'shift_address'
                        },
                        {
                            draw: true,
                            text: 'Estado',
                            label: info => (
                                <>
                                    <FontAwesomeIcon
                                        icon={getIcon(info)}
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
    shiftsRequested
} = SessionActions;

const mapStateToProps = state => ({
    user: fromState.Session.getUser()(state),
    branch: fromState.Session.getBranch()(state),
    sector: fromState.Session.getSector()(state),
    employees: fromState.Session.getEmployees()(state),
    shifts: fromState.Session.getShifts()(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    branchRequested,
    sectorRequested,
    employeeRequested,
    shiftsRequested
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Shift);
