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
// import Container from '@material-ui/core/Container';
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
    Container,
    Media,
    Row,
    Col
} from 'reactstrap';
import Button from '@material-ui/core/Button';
import fromState from '@selectors';
import {
    SessionActions
} from '@actions';
import {
    get,
    map,
    random,
    forEach,
    find
} from 'lodash';
import Dropdown from '@components/common/Dropdown';
import InputDate from '@components/common/InputDate';
import CalendarPicker from '@components/common/CalendarPicker';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDoubleDown} from '@fortawesome/free-solid-svg-icons';
import TableList from '@components/common/TableList';
import ModalWithDynamicButtons from '@components/common/ModalWithDynamicButtons';
import Logo from '../../images/logo_2.png';

// console.log('abi', abi)

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
        width: '300px',
        height: '80px',
        fontSize: '19px',
        backgroundColor: '#cba9dc',
        '&:hover': {
            background: '#cba9dc'
        }
    }
}));

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
    ...props
}) {
    const classes = useStyles();
    const [branchValue, setBranch] = useState();
    const [sectorValue, setSector] = useState();
    const [employeeValue, setEmployee] = useState();
    const [comments, setComments] = useState();
    const [date, setDate] = useState();
    const [hour, setHour] = useState();
    const [blockChainInfo, setBlockChainInfo] = useState();
    const history = useHistory();
    const company = get(props, 'match.params.name', 'Company');

    useEffect(() => {
        branchRequested();
        sectorRequested();
        employeeRequested();

        const info = localStorage.getItem('info');
        if (info) {
            setBlockChainInfo(JSON.parse(info));
        }
    }, []);

    const handleBranch = value => {
        setBranch(value);
    };

    const handleSector = value => {
        setSector(value);
    };

    const handleEmployee = value => {
        setEmployee(value);
    };

    const handleComments = value => {
        setComments(value);
    };

    const getEmployeeName = value => {
        const findedEmployee = find(employees, emp => emp._id === value);
        return `${get(findedEmployee, 'user_name')} ${get(findedEmployee, 'user_lastname')}`;
    };

    const getBranchAddress = value => {
        const findedBranch = find(branch, b => b._id === value);
        return get(findedBranch, 'branch_address');
    };

    const handleConfirmation = e => {
        e.preventDefault();
        const shiftToSend = {
            branch_id: branchValue,
            user_id: get(user, '_id'),
            company_name: company,
            employee_name: getEmployeeName(employeeValue),
            shift_address: getBranchAddress(branchValue),
            ce_id: employeeValue,
            shift_call: random(0, 5000),
            shift_duration: '1', // Tomo de la agenda del tipo agenda_shift_duration
            shift_date: date,
            shift_start: hour,
            shift_comment: comments,
            shift_status: 'onHold'
        };
        shiftRequested(
            shiftToSend
        );
        history.push(`/myShifts/${get(user, '_id')}`);
    };

    const handleBlockChainInfo = async e => {
        e.preventDefault();
    };

    return (
        <div className="mx-auto ml-5">
            <Row className="mt-5 ml-5 mr-0">
                <Col className="text-center mx-auto">
                    <p className="h3 font-weight-bold">
                        Solicitud de turno para
                        {' '}
                        {company}
                    </p>
                    <Dropdown
                        className="mx-auto"
                        options={branch}
                        getOptionValue={opt => opt._id}
                        getOptionLabel={opt => opt.branch_name}
                        onChange={({target: {value}}) => handleBranch(value)}
                        placeholder="Sucursal"
                        value={branchValue}
                    />
                    <FontAwesomeIcon icon={faAngleDoubleDown}/>
                    <Dropdown
                        className="mx-auto"
                        options={sector}
                        getOptionValue={opt => opt._id}
                        getOptionLabel={opt => opt.cs_desc}
                        onChange={({target: {value}}) => handleSector(value)}
                        placeholder="Sector"
                        value={sectorValue}
                    />
                    <FontAwesomeIcon icon={faAngleDoubleDown}/>
                    <Dropdown
                        className="mx-auto"
                        options={employees}
                        getOptionValue={opt => opt._id}
                        getOptionLabel={opt => `${opt.user_name}${opt.user_lastname}`}
                        onChange={({target: {value}}) => handleEmployee(value)}
                        placeholder="Profesional"
                        value={employeeValue}
                    />
                    <FontAwesomeIcon icon={faAngleDoubleDown}/>
                    <Col/>
                    <TextareaAutosize
                        className="w-100 h-50 mx-auto"
                        rowsMax={4}
                        placeholder="Comentarios"
                        onChange={({target: {value}}) => handleComments(value)}
                        value={comments}
                    />
                </Col>
                <Col className="text-center">
                    <InputDate
                        setDate={setDate}
                        setHour={setHour}
                    />
                    <CalendarPicker
                        date={date}
                        setDate={setDate}
                    />
                </Col>
                <Col className="align-text-bottom w-25 h-50 g ">
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={e => handleConfirmation(e)}
                    >
                        Solicitar
                    </Button>

                    {/* <Button
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={e => handleBlockChainInfo(e)}
                    >
                        Ver informacion de la BLOCKCHAIN
                    </Button> */}
                </Col>
                <Col className="align-text-bottom w-25 h-50"/>
            </Row>
            <Row style={{marginTop: '500px'}}>
                {blockChainInfo && (
                    <TableList
                        information={getParsedBlockchain(blockChainInfo)}
                        primaryKey="id"
                        headers={[
                            {label: 'Sucursal'},
                            {label: 'Empleado'},
                            {label: 'Llamadas al turno'},
                            {label: 'Comentario'},
                            {label: 'Fecha'},
                            {label: 'Duración'},
                            {label: 'Comienzo'},
                            {label: ' Usuario '}
                        ]}
                        columns={[
                            {
                                draw: true,
                                text: 'Sucursal',
                                label: 'branch_id'
                            },
                            {
                                draw: true,
                                text: 'Empleado',
                                label: 'ce_id'
                            },
                            {
                                draw: true,
                                text: 'Llamadas al turno',
                                label: 'ce_id'
                            },
                            {
                                draw: true,
                                text: 'Comentario',
                                label: 'shift_comment'
                            },
                            {
                                draw: true,
                                text: 'Fecha',
                                label: 'shift_date'
                            },
                            {
                                draw: true,
                                text: 'Duración',
                                label: 'shift_duration'
                            },
                            {
                                draw: true,
                                text: 'Comienzo',
                                label: 'shift_start'
                            },
                            {
                                draw: true,
                                text: 'Usuario',
                                label: 'user_id'
                            }
                        ]}
                    />
                )}
            </Row>
        </div>
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
