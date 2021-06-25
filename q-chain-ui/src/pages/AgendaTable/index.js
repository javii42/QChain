/* eslint-disable camelcase */
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
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
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
    Input,
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
    faPen
} from '@fortawesome/free-solid-svg-icons';
import TableList from '@components/common/TableList';
import classNames from 'classnames';

import {
    faSquare
} from '@fortawesome/free-regular-svg-icons';
import ModalWithDynamicButtons from '@components/common/ModalWithDynamicButtons';
import OnlyDate from '@components/common/OnlyDate';
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
    if (get(info, 'agenda_open')) {
        return faCheckCircle;
    }
    return faTimesCircle;
};

const getWeekDay = cAgenda => {
    const agendaWeekDay = get(cAgenda, 'agenda_week_day');
    switch (agendaWeekDay) {
        case 1:
            return 'Lunes';
        case 2:
            return 'Martes';
        case 3:
            return 'Miércoles';
        case 4:
            return 'Jueves';
        case 5:
            return 'Viernes';
        case 6:
            return 'Sábado';
        default:
            return 'Domingo';
    }
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
    registerRequested,
    agenda,
    agendaRequested,
    ...props
}) {
    const [cAgenda, setcAgenda] = useState();
    const [specialDate, setSpecialDate] = useState();
    const [addSpecialDate, setAddSpecialDate] = useState();
    const [specialData, setSpecialData] = useState();
    const [date, setDate] = useState();
    const [startHour, setStartHour] = useState();
    const classes = useStyles();

    useEffect(() => {
        if (isEmpty(agenda)) {
            // const ce_id = get(props, 'match.params.id');
            agendaRequested({ce_id: '60a83bf36c907765cab24b5e'});
        }
    }, []);

    const handleSpecialDate = value => {
        console.log('value', value);
        setSpecialDate(value);
    };

    const handleAddSpecialDate = value => {
        setAddSpecialDate(value);
    };

    const handleSpecialData = value => {
        setSpecialData(value);
    };

    const handleAgenda = value => {
        console.log('value', value);
        setcAgenda(value);
    };

    return (
        <Row className="m-0">
            <Col className="text-center m-5">
                <div
                    className="float-left h5"
                >
                    Agenda - Barracas - Dr. Sonez
                </div>
                <div
                    className="float-right h5"
                >
                    <Button
                        className="react-btn"
                        onClick={() => handleSpecialDate(true)}
                    >
                        FECHAS ESPECIALES
                    </Button>
                </div>
                <Col className="mt-5">
                    <TableList
                        handlePopup={handleAgenda}
                        information={agenda}
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
                                label: info => {
                                    const agendaWeekDay = get(info, 'agenda_week_day');
                                    switch (agendaWeekDay) {
                                        case 1:
                                            return 'Lunes';
                                        case 2:
                                            return 'Martes';
                                        case 3:
                                            return 'Miércoles';
                                        case 4:
                                            return 'Jueves';
                                        case 5:
                                            return 'Viernes';
                                        case 6:
                                            return 'Sábado';
                                        default:
                                            return 'Domingo';
                                    }
                                }
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
                                label: info => {
                                    const agenda_opening = new Date(get(info, 'agenda_opening'));
                                    if (agenda_opening) {
                                        const seconds = String(agenda_opening.getSeconds()).padStart(2, '0');
                                        const minutes = String(agenda_opening.getMinutes()).padStart(2, '0');
                                        const hour = String(agenda_opening.getHours()).padStart(2, '0');
                                        return `${hour}:${minutes}:${seconds}`;
                                    }
                                    return '';
                                }
                            },
                            {
                                draw: true,
                                text: 'Fin',
                                label: info => {
                                    const agenda_closing = new Date(get(info, 'agenda_closing'));
                                    if (agenda_closing) {
                                        const seconds = String(agenda_closing.getSeconds()).padStart(2, '0');
                                        const minutes = String(agenda_closing.getMinutes()).padStart(2, '0');
                                        const hour = String(agenda_closing.getHours()).padStart(2, '0');
                                        return `${hour}:${minutes}:${seconds}`;
                                    }
                                    return '';
                                }
                            },
                            {
                                draw: true,
                                text: 'Turnos simultaneos',
                                label: 'agenda_sim_shifts'
                            },
                            {
                                draw: true,
                                text: 'Cantidad max. Turnos',
                                label: 'agenda_q_shifts'
                            },
                            {
                                draw: true,
                                text: 'Duracion del turno',
                                label: info => {
                                    const agenda_shift_duration = new Date(get(info, 'agenda_shift_duration'));
                                    if (agenda_shift_duration) {
                                        const minutes = String(agenda_shift_duration.getMinutes()).padStart(2, '0');
                                        return `00:${minutes}`;
                                    }
                                    return '';
                                }
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
                <TableList
                    handlePopup={handleAddSpecialDate}
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
                        },
                        {
                            id: '5',
                            day_week: 'Viernes',
                            status: false,
                            start: '12:00',
                            end: '18:00',
                            threadShift: '1',
                            maxShifts: '16',
                            duration: '00:30'
                        },
                        {
                            id: '5',
                            day_week: 'Sabado',
                            status: false,
                            start: '12:00',
                            end: '18:00',
                            threadShift: '1',
                            maxShifts: '16',
                            duration: '00:30'
                        },
                        {
                            id: '5',
                            day_week: 'Domingo',
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
            {specialDate && (
                <ModalWithDynamicButtons
                    closed
                    title={(
                        <>
                            <Row>
                                <Col className="text-center mx-auto">
                                    Fechas especiales
                                </Col>
                            </Row>
                            <Row>
                                <Col className="icon-status">
                                    <div className="icon-status ml-5 mt-2">
                                        <Button
                                            size="small"
                                            className="react-btn"
                                            onClick={() => handleAddSpecialDate(true)}
                                            onTouchEnd={() => handleAddSpecialDate(true)}
                                        >
                                            Agregar
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </>
                    )}
                    message={(
                        <Row>
                            <Col className="text-center">
                                <Typography>
                                    25/05/2021
                                </Typography>
                                <br/>
                                <Typography>
                                    29/05/2021
                                </Typography>
                                <br/>
                                <Typography>
                                    09/07/2021
                                </Typography>
                                <br/>
                                <Typography>
                                    08/12/2021
                                </Typography>
                                <br/>
                                <Typography>
                                    25/05/2021
                                </Typography>
                            </Col>
                            <Col/>
                        </Row>
                    )}
                    buttons={
                        [
                            {
                                onClick: () => handleSpecialDate(false),
                                onTouchEnd: () => handleSpecialDate(false),
                                className: 'd-none'
                            }

                        ]
                    }
                    buttonToggleIndex={0}
                />
            )}
            {addSpecialDate && (
                <ModalWithDynamicButtons
                    closed
                    title={(
                        <>
                            <Row>
                                <Col className="text-center mx-auto">
                                    Nueva fecha especial
                                </Col>
                            </Row>
                            <Row>
                                <Col className="icon-status">
                                    <div className="icon-status ml-5 mt-2">
                                        <Switch
                                            checked={get(specialData, 'checked')}
                                            onChange={() => handleSpecialData()}
                                            inputProps={{'aria-label': 'secondary checkbox'}}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </>
                    )}
                    message={(
                        <Row>
                            <Col>
                                <OnlyDate
                                    date={date}
                                    setDate={setDate}
                                />
                                <InputDate
                                    setDate={setDate}
                                    setHour={setStartHour}
                                    label="Hora inicio"
                                />
                                <InputDate
                                    setDate={setDate}
                                    setHour={setStartHour}
                                    label="Hora fin"
                                />
                                <Input
                                    className="mx-auto"
                                    placeholder="Duracion del turno"
                                />
                            </Col>
                            <Col
                                className="mx-auto text-center"
                                style={{marginTop: '65px'}}
                            >
                                <Input
                                    className="mx-auto mt-2"
                                    placeholder="Turnos simultaneos"
                                />
                                <Input
                                    className="mx-auto mt-2"
                                    placeholder="Turnos max."
                                />
                                <Button
                                    size="small"
                                    className="react-btn mt-3"
                                    onClick={() => handleAddSpecialDate(true)}
                                    onTouchEnd={() => handleAddSpecialDate(true)}
                                >
                                    AGREGAR
                                </Button>
                            </Col>
                        </Row>
                    )}
                    buttons={
                        [
                            {
                                onClick: () => handleAddSpecialDate(false),
                                onTouchEnd: () => handleAddSpecialDate(false),
                                className: 'd-none'
                            }

                        ]
                    }
                    buttonToggleIndex={0}
                />
            )}
            {cAgenda && (
                <ModalWithDynamicButtons
                    closed
                    title={(
                        <>
                            <Row>
                                <Col className="text-center mx-auto">
                                    Editar -
                                    {' '}
                                    {getWeekDay(cAgenda)}
                                </Col>
                            </Row>
                            <Row>
                                <Col className="icon-status">
                                    <div className="icon-status ml-5 mt-2">
                                        <Switch
                                            checked={get(cAgenda, 'agenda_open')}
                                            onChange={() => handleSpecialData()}
                                            inputProps={{'aria-label': 'secondary checkbox'}}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </>
                    )}
                    message={(
                        <Row>
                            <Col>
                                {/*                                 <OnlyDate
                                    date={date}
                                    setDate={setDate}
                                /> */}
                                <InputDate
                                    setDate={setDate}
                                    setHour={setStartHour}
                                    label="Hora inicio"
                                />
                                <InputDate
                                    setDate={setDate}
                                    setHour={setStartHour}
                                    label="Hora fin"
                                />
                                <Input
                                    className="mx-auto"
                                    placeholder="Duracion del turno"
                                    value={
                                        () => {
                                            const agenda_shift_duration = new Date(get(cAgenda, 'agenda_shift_duration'));
                                            if (agenda_shift_duration) {
                                                const minutes = String(agenda_shift_duration.getMinutes()).padStart(2, '0');
                                                return `00:${minutes}`;
                                            }
                                            return '';
                                        }
                                    }
                                />
                            </Col>
                            <Col
                                className="mx-auto text-center"
                                style={{marginTop: '65px'}}
                            >
                                <Input
                                    className="mx-auto mt-2"
                                    placeholder="Turnos simultaneos"
                                    value={get(cAgenda, 'agenda_sim_shifts')}
                                />
                                <Input
                                    className="mx-auto mt-2"
                                    placeholder="Turnos max."
                                    value={get(cAgenda, 'agenda_q_shifts')}
                                />
                                <Button
                                    size="small"
                                    className="react-btn mt-3"
                                    onClick={() => handleAgenda(true)}
                                    onTouchEnd={() => handleAgenda(true)}
                                >
                                    EDITAR
                                </Button>
                            </Col>
                        </Row>
                    )}
                    buttons={
                        [
                            {
                                onClick: () => handleAgenda(false),
                                onTouchEnd: () => handleAgenda(false),
                                className: 'd-none'
                            }

                        ]
                    }
                    buttonToggleIndex={0}
                />
            )}
        </Row>
    );
}

const {
    branchRequested,
    sectorRequested,
    employeeRequested,
    shiftRequested,
    agendaRequested
} = SessionActions;

const mapStateToProps = state => ({
    user: fromState.Session.getUser()(state),
    branch: fromState.Session.getBranch()(state),
    sector: fromState.Session.getSector()(state),
    employees: fromState.Session.getEmployees()(state),
    agenda: fromState.Session.getAgenda()(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    branchRequested,
    sectorRequested,
    employeeRequested,
    shiftRequested,
    agendaRequested
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Shift);
