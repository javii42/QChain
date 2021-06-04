/* global window */
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
    Media,
    Row,
    Col,
    Button
} from 'reactstrap';
import fromState from '@selectors';
import {
    SessionActions
} from '@actions';
import {get, head, random} from 'lodash';
import Dropdown from '@components/common/Dropdown';
import InputDate from '@components/common/InputDate';
// import CalendarPicker from '@components/common/CalendarPicker';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDoubleDown} from '@fortawesome/free-solid-svg-icons';
import Logo from '../../images/logo.png';
import Web3 from './web3';
import abi from './abi';

//console.log('abi', abi)

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

const ethEnabled = () => {
    if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      window.ethereum.enable();
      return true;
    }
    return false;
  }

if (!ethEnabled()) {
    alert("Please install MetaMask to use this dApp!");
}


const contractAddress = '0xFBe0Bd313a278079f8155Ee86f8be008E881fFFc'; 
const contract = new window.web3.eth.Contract(abi, contractAddress);

// Accounts
var account;

web3.eth.getAccounts(function(err, accounts) {
  if (err != null) {
    alert("Error retrieving accounts.");
    console.log(err);
    return;
  }
  if (accounts.length == 0) {
    alert("No account found! Make sure the Ethereum client is configured properly.");
    return;
  }
  account = accounts[0];
  console.log('Account: ' + account);
  web3.eth.defaultAccount = account;
});

/*
        address userAddress,
        uint _index,
        string memory _date,
        string memory _jsonData,
        string memory _user,
        bool _status
*/

//Smart contract functions
function ShiftSetInfo(info) {
    contract.methods.insertShift(account, 7, Date.now(), info, 'javier', true).send( {from: account}).then( function(tx) { 
    console.log("Transaction: ", tx); 
  });
}

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
    const [branchValue, setBranch] = useState();
    const [sectorValue, setSector] = useState();
    const [employeeValue, setEmployee] = useState();
    const [comments, setComments] = useState();
    const [date, setDate] = useState();
    const [hour, setHour] = useState();
    const [isEthEnabled, setEthEnabled] = useState();

    /* useEffect(() => {
        if(!isEthEnabled) {
           const ethEnabled = () => {
                if (window.web3) {
                  window.web3 = new Web3(window.web3.currentProvider);
                  window.ethereum.enable();
                  setEthEnabled(true);
                  return true;
                }
                return false;
              }
            
            if (!ethEnabled()) {
                alert("Please install MetaMask to use this dApp!");
            }
        }
    });*/

    useEffect(() => {
        branchRequested();
        sectorRequested();
        employeeRequested();
        /*const ethEnabled = () => {
            if (window.web3) {
              window.web3 = new Web3(window.web3.currentProvider);
              window.ethereum.enable();
              return true;
            }
            return false;
          }
        
        if (!ethEnabled()) {
            alert("Please install MetaMask to use this dApp!");
        }*/
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

    const handleConfirmation = () => {
        const shiftToSend = {
            branch_id: branchValue,
            user_id: get(user, '_id'),
            ce_id: employeeValue,
            shift_call: random(0, 5000),
            shift_duration: '1', // Tomo de la agenda del tipo agenda_shift_duration
            shift_date: date,
            shift_start: hour,
            shift_comment: comments
        };
        shiftRequested(
            shiftToSend
        );
        ShiftSetInfo(JSON.stringify(shiftToSend));
        // Accounts
        /*let account;

        window.web3.eth.getAccounts(function(err, accounts) {
        if (err != null) {
            alert("Error retrieving accounts.");
            console.log(err);
            return;
        }
        if (accounts.length == 0) {
            alert("No account found! Make sure the Ethereum client is configured properly.");
            return;
        }
        account = accounts[0];
        console.log('Account: ' + account);
        window.web3.eth.defaultAccount = account;
        });
        const contractAddress = '0xFBe0Bd313a278079f8155Ee86f8be008E881fFFc';  //'0x73ec81da0c72dd112e06c09a6ec03b5544d26f05';
        //contract instance
        const contract = new window.web3.eth.Contract(abi, contractAddress);
        console.log('contact', contract)
        contract.methods.insertShift(
            account, 7, Date.now(), JSON.stringify(shiftToSend), 'javier', true).send( {from: account}).then( function(tx) { 
            console.log("Transaction: ", tx); 
        });*/
    };

    return (
        <Container>
            <Row md={8} style={{marginTop: '200px'}} className="ml-5 float-sm-left">
                <Col className="text-center">
                    <p className="h3 font-weight-bold">Solicitud de turno para [Company name]</p>
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
                    {/* <CalendarPicker/> */}
                </Col>
                <Col className="align-text-bottom w-25 h-50">
                    <Button
                        color="purple h-50 w-25"
                        onClick={() => handleConfirmation()}
                    >
                        Solicitar
                    </Button>
                </Col>
            </Row>
        </Container>
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
