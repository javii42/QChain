/* global localStorage, window */
import React, {
    useEffect,
    useState
} from 'react';
import {useHistory} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {fade, makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SignIn from '@pages/SignIn';
import ModalWithDynamicButtons from '@components/common/ModalWithDynamicButtons';
import Register from '@pages/Register';
import {
    map, isEmpty, filter, includes, toLower, random
} from 'lodash';
import {
    SessionActions
} from '@actions';
import fromState from '@selectors';

const getRandomImg = () => {
    const img = random(1, 3);
    if (img === 1) {
        return 'https://sitioinstituionalqa.blob.core.windows.net/home/20180627_110021-20171101_161235-institucional-min.jpg';
    }
    if (img === 2) {
        return 'https://parabuenosaires.com/wp-content/uploads/2017/10/Hospital-Brit%C3%A1nico2.jpg';
    }
    return 'https://www.javea.com/wp-content/uploads/2021/04/doctor-fernando-sanchez-ruano-hospital-clinica-benidorm-hcb.jpg';
};

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2)
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
        marginTop: '25px'
    },
    heroButtons: {
        marginTop: theme.spacing(4)
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8)
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardMedia: {
        paddingTop: '56.25%' // 16:9
    },
    cardContent: {
        flexGrow: 1
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6)
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1
    },
    iconButton: {
        padding: 10,
        color: '#fff',
        backgroundColor: '#cba9dc',
        borderRadius: 3,
        height: '100%'
    },
    divider: {
        height: 28,
        margin: 4
    }
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Dashboard = ({
    companies,
    companiesRequested,
    registerRequested
}) => {
    const history = useHistory();

    const classes = useStyles();

    const [query, setQuery] = useState();
    const [filtered, setFiltered] = useState(companies);
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState('login');

    useEffect(() => {
        if (isEmpty(query) || isEmpty(filtered)) {
            setFiltered(companies);
        }
    });
    useEffect(() => {
        if (isEmpty(companies)) {
            companiesRequested();
        }
        if (isEmpty(query) || isEmpty(filtered)) {
            setFiltered(companies);
        }
    }, []);

    useEffect(() => {
        if (isEmpty(companies)) {
            companiesRequested();
        }
        if (isEmpty(query) || isEmpty(filtered)) {
            setFiltered(companies);
        }
    }, [query]);

    const handleQuery = e => {
        const {
            target: {
                value
            }
        } = e;
        setQuery(value);
    };

    const handleGetShift = (id, name) => {
        if (localStorage.getItem('user')) {
            window.location = `/#/shift/${id}/${name}`;
            return 1;
            // return history.push(`/shift/${id}/${name}`);
        }
        return setOpenModal(true);
    };

    const handleSearch = e => {
        e.preventDefault();
        setFiltered(filter(companies, c => includes(toLower(c.company_name), toLower(query))));
    };

    return (
        <>
            <div className={classes.heroContent}>
                <div className={classes.heroButtons}>
                    <Grid container justify="center">
                        <Paper component="form" className={classes.root}>
                            <InputBase
                                className={classes.input}
                                placeholder="Busca tu turno"
                                inputProps={{'aria-label': 'search google maps'}}
                                onChange={e => handleQuery(e)}
                            />
                            <IconButton
                                className={classes.iconButton}
                                aria-label="search"
                                onClick={e => handleSearch(e)}
                            >
                                <SearchIcon/>
                            </IconButton>
                        </Paper>
                    </Grid>
                </div>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {map(filtered, card => (
                        <Grid item key={card} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={getRandomImg()}
                                    title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {card.company_name}
                                    </Typography>
                                    <Typography>
                                        Descripcion por defecto
                                        <br/>
                                        Contacto:
                                        {' '}
                                        {card.company_mail}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        color="primary"
                                        onClick={() => handleGetShift(card._id, card.company_name)}
                                    >
                                        Ver m??s
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                {openModal && modalType !== 'hide' && (
                    <ModalWithDynamicButtons
                        message={(
                            <>
                                {modalType === 'login' && (
                                    <SignIn
                                        setModalType={setModalType}
                                    />
                                )}
                                {modalType === 'register' && (
                                    <Register
                                        setModalType={setModalType}
                                        registerRequested={registerRequested}
                                    />
                                )}
                            </>
                        )}
                        buttons={
                            [
                                {
                                    onClick: () => setOpenModal(false),
                                    onTouchEnd: () => setOpenModal(false),
                                    className: 'd-none'
                                }

                            ]
                        }
                        buttonToggleIndex={0}
                    />
                )}
            </Container>
        </>
    );
};

const {
    companiesRequested,
    registerRequested
} = SessionActions;

const mapStateToProps = state => ({
    companies: fromState.Session.getCompanies()(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    companiesRequested,
    registerRequested
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
