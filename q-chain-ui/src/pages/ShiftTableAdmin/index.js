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
    get, map, random, forEach, isEmpty, cloneDeep, includes, filter, set
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
    faSync,
    faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import TableList from '@components/common/TableList';
import ModalWithDynamicButtons from '@components/common/ModalWithDynamicButtons';
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

const getHeaders = (isMobile, handleMasterCheck, masterCheck) => {
    if (!isMobile) {
        return [
            {
                label: () => (
                    <>
                        <Label
                            onClick={() => handleMasterCheck()}
                        >
                            <input
                                className="d-none"
                                type="checkbox"
                            />
                            <FontAwesomeIcon
                                className={classNames({disabled: false})}
                                icon={masterCheck ? faCheckSquare : faSquare}
                                size="2x"
                            />
                        </Label>
                    </>
                )
            },
            {label: 'Cliente'},
            {label: 'Profesional'},
            {label: 'Fecha y hora'},
            {label: 'Sucursal'},
            {label: 'Estado'}
        ];
    }
    return [
        {
            label: () => (
                <>
                    <Label
                        onClick={() => handleMasterCheck()}
                    >
                        <input
                            className="d-none"
                            type="checkbox"
                        />
                        <FontAwesomeIcon
                            className={classNames({disabled: false})}
                            icon={masterCheck ? faCheckSquare : faSquare}
                            size="2x"
                        />
                    </Label>
                </>
            )
        },
        {label: 'Fecha y hora'},
        {label: 'Estado'},
        {label: ''}
    ];
};

const getColumns = (isMobile, handleCheck, check) => {
    if (!isMobile) {
        return [
            {
                draw: true,
                text: '',
                label: info => (
                    <>
                        <Label
                            id={`u${info._id}`}
                            onClick={() => handleCheck(info._id)}
                        >
                            <input
                                className="d-none"
                                id={`t${info._id}`}
                                type="checkbox"
                            />
                            <FontAwesomeIcon
                                className={classNames({disabled: false})}
                                icon={includes(check, info._id) ? faCheckSquare : faSquare}
                                size="2x"
                            />
                        </Label>
                    </>
                )
            },
            {
                draw: true,
                text: 'Cliente',
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
                label: info => {
                    const sStart = new Date(get(info, 'shift_start'));
                    const shiftDate = new Date(get(info, 'shift_date'));
                    const dd = String(shiftDate.getDate()).padStart(2, '0');
                    const mm = String(shiftDate.getMonth() + 1).padStart(2, '0'); // January is 0!
                    const yyyy = shiftDate.getFullYear();
                    const date = `${mm}/${dd}/${yyyy}`;
                    return `${date} - ${String(sStart.getHours()).padStart(2, '0')}:${String(sStart.getMinutes()).padStart(2, '0')}:${String(sStart.getSeconds()).padStart(2, '0')}`;
                }
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
        ];
    }
    return [
        {
            draw: true,
            text: '',
            label: info => (
                <>
                    <Label
                        id={`u${info._id}`}
                        onClick={() => handleCheck(info._id)}
                    >
                        <input
                            className="d-none"
                            id={`t${info._id}`}
                            type="checkbox"
                        />
                        <FontAwesomeIcon
                            className={classNames({disabled: false})}
                            icon={includes(check, info._id) ? faCheckSquare : faSquare}
                            size="2x"
                        />
                    </Label>
                </>
            )
        },
        {
            draw: true,
            text: 'Fecha y hora',
            label: info => {
                const sStart = new Date(get(info, 'shift_start'));
                const shiftDate = new Date(get(info, 'shift_date'));
                const dd = String(shiftDate.getDate()).padStart(2, '0');
                const mm = String(shiftDate.getMonth() + 1).padStart(2, '0'); // January is 0!
                const yyyy = shiftDate.getFullYear();
                const date = `${mm}/${dd}/${yyyy}`;
                return `${date} - ${String(sStart.getHours()).padStart(2, '0')}:${String(sStart.getMinutes()).padStart(2, '0')}:${String(sStart.getSeconds()).padStart(2, '0')}`;
            }
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
        },
        {
            draw: true,
            text: '',
            label: info => (
                <>
                    <FontAwesomeIcon
                        icon={faInfoCircle}
                        size="2x"
                    />
                </>
            )
        }
    ];
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
    updateShift,
    ...props
}) {
    const classes = useStyles();
    const [popup, setPopup] = useState();
    const [check, setCheck] = useState([]);
    const [masterCheck, setMasterCheck] = useState();
    const [deletePopup, setDeletePopup] = useState();

    const [isMobile, setIsMobile] = useState(false);

    let widthOutput = window.innerWidth;
    if (widthOutput < 1000 && !isMobile) {
        setIsMobile(true);
    }

    if (widthOutput > 999 && isMobile) {
        setIsMobile(false);
    }
    function reportWindowSize() {
        widthOutput = window.innerWidth;

        if (widthOutput < 1000 && !isMobile) {
            setIsMobile(true);
        }

        if (widthOutput > 999 && isMobile) {
            setIsMobile(false);
        }
    }

    window.onresize = reportWindowSize;

    useEffect(() => {
        if (isEmpty(shifts)) {
            const user_id = get(props, 'match.params.id');
            shiftsRequested({user_id});
        }
    }, []);

    const handlePopup = value => {
        setPopup(value);
    };

    const handleCheck = value => {
        const newValue = cloneDeep(check);
        if (!includes(newValue, value)) {
            newValue.push(value);
        } else {
            const index = newValue.indexOf(value);
            if (index > -1) {
                newValue.splice(index, 1);
            }
        }
        setCheck(newValue);
    };

    const handleAllChecks = () => {
        const previusValue = cloneDeep(check);
        if (!isEmpty(previusValue)) {
            setCheck([]);
        } else {
            setCheck(map(shifts, s => s._id));
        }
    };

    const handleMasterCheck = () => {
        const previusValue = cloneDeep(masterCheck);
        setMasterCheck(!previusValue);
        handleAllChecks();
    };

    const handleDeletePopup = value => {
        setDeletePopup(value);
    };

    const handleDeleteShifts = e => {
        e.preventDefault();
        const newShifts = cloneDeep(shifts);
        forEach(newShifts, s => {
            if (includes(check, s._id)) {
                set(s, 'shift_status', 'Cancelled');
                updateShift(s);
            }
        });
        setDeletePopup(false);
    };

    console.log('check', check);

    return (
        <Row className="ml-2 mt-5">
            <div
                className="h5 ml-5"
            >
                Turnos
            </div>
            <Col className={`text-center ${!isMobile ? 'm-5' : 'mt-4'}`}>
                <Row className="w-50">
                    <Col>
                        <Dropdown
                            options={employees}
                            getOptionValue={opt => opt._id}
                            getOptionLabel={opt => `${opt.user_name}${opt.user_lastname}`}
                            onChange={({target: {value}}) => (value)}
                            placeholder="Profesional"
                            value="employeeValue"
                        />
                    </Col>
                    <Col>
                        <Dropdown
                            className="mx-auto"
                            options={employees}
                            getOptionValue={opt => opt._id}
                            getOptionLabel={opt => `${opt.user_name}${opt.user_lastname}`}
                            onChange={({target: {value}}) => (value)}
                            placeholder="Sucursal"
                            value="employeeValue"
                        />
                    </Col>
                </Row>
                <Row className="w-50">
                    <Col>
                        <Dropdown
                            className="mx-auto"
                            options={employees}
                            getOptionValue={opt => opt._id}
                            getOptionLabel={opt => `${opt.user_name}${opt.user_lastname}`}
                            onChange={({target: {value}}) => (value)}
                            placeholder="ID - CLIENTE"
                            value="employeeValue"
                        />
                    </Col>
                    <Col>
                        <Dropdown
                            className="mx-auto"
                            options={employees}
                            getOptionValue={opt => opt._id}
                            getOptionLabel={opt => `${opt.user_name}${opt.user_lastname}`}
                            onChange={({target: {value}}) => (value)}
                            placeholder="FECHA DESDE"
                            value="employeeValue"
                        />
                    </Col>
                    <Col>
                        <Dropdown
                            className="mx-auto"
                            options={employees}
                            getOptionValue={opt => opt._id}
                            getOptionLabel={opt => `${opt.user_name}${opt.user_lastname}`}
                            onChange={({target: {value}}) => (value)}
                            placeholder="FECHA HASTA"
                            value="employeeValue"
                        />
                    </Col>
                    <Col
                        className="float-right h5 ml-5"
                    >
                        <Button
                            className="react-btn"
                            onClick={() => handleDeletePopup(true)}
                        >
                            APLICAR FILTROS
                        </Button>
                    </Col>
                </Row>

                <TableList
                    information={filter(shifts, s => get(s, 'shift_status') !== 'Cancelled')}
                    handlePopup={handlePopup}
                    popup={popup}
                    primaryKey="id"
                    headers={getHeaders(isMobile, handleMasterCheck, masterCheck)}
                    columns={getColumns(isMobile, handleCheck, check)}
                />
                <div
                    className="float-right h5"
                >
                    <Button
                        className="react-btn"
                        onClick={() => handleDeletePopup(true)}
                        disabled={isEmpty(check)}
                    >
                        CANCELAR TURNO/S
                    </Button>
                    {deletePopup && (
                        <ModalWithDynamicButtons
                            title="Confirmación"
                            message={(
                                <Row>
                                    <Col>
                                        ¿Está seguro que desea proceder con la cancelación?
                                    </Col>
                                </Row>
                            )}
                            buttons={
                                [
                                    {
                                        onClick: e => handleDeleteShifts(e),
                                        onTouchEnd: e => handleDeleteShifts(e),
                                        className: 'react-btn',
                                        label: 'Confirmar'
                                    },
                                    {
                                        onClick: () => handleDeletePopup(false),
                                        onTouchEnd: () => handleDeletePopup(false),
                                        className: 'react-btn',
                                        label: 'Cancelar'
                                    }
                                ]
                            }
                            buttonToggleIndex={1}
                        />
                    )}
                </div>
            </Col>
        </Row>
    );
}

const {
    branchRequested,
    sectorRequested,
    employeeRequested,
    shiftsRequested,
    updateShift
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
    shiftsRequested,
    updateShift
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Shift);
