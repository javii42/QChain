import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Container from '@material-ui/core/Container';
import {
    Button,
    Row,
    Col
} from 'reactstrap';
import {SessionActions} from '@actions';
import fromState from '@selectors';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faUserFriends,
    faTv,
    faCalendarCheck,
    faExclamationCircle,
    faSync,
    faCheckCircle,
    faTimesCircle,
    faClock
} from '@fortawesome/free-solid-svg-icons';

const DashboardUser = ({}) => (
    <Container component="main" maxWidth="m" className="my-auto text-center">

        <div className="mx-auto">
            <Button className="square-buttons">
                <FontAwesomeIcon
                    className="pb-2"
                    icon={faUserFriends}
                    size="3x"
                />
                <p className="text-medium">128</p>
                <p className="soft-gray-text-small">Empleados</p>
            </Button>

            <Button className="square-buttons">
                <FontAwesomeIcon
                    className="pb-2"
                    icon={faTv}
                    size="3x"
                />
                <p className="text-medium">50</p>
                <p className="soft-gray-text-small">Turnos pendientes</p>
            </Button>

            <Button className="square-buttons">
                <FontAwesomeIcon
                    className="pb-2"
                    icon={faCalendarCheck}
                    size="3x"
                />
                <p className="text-medium">32</p>
                <p className="soft-gray-text-small">Turnos atendidos</p>
            </Button>

            <Button className="square-buttons">
                <FontAwesomeIcon
                    className="pb-2"
                    icon={faExclamationCircle}
                    size="3x"
                />
                <p className="text-medium">6</p>
                <p className="soft-gray-text-small">Turnos cancelados</p>
            </Button>
        </div>

        <Row>
            <Col className="graphic-table mr-2 ml-2">
                <p className="text-center text-medium mt-3">Turnos</p>
                <section className="bar-graph bar-graph-vertical bar-graph-two">
                    <div className="bar-one bar-container m-2">
                        <div className="bar" data-percentage="5"/>
                        <span className="year">Atendidos</span>
                    </div>
                    <div className="bar-two bar-container m-2">
                        <div className="bar" data-percentage="8"/>
                        <span className="year">Cancelados</span>
                    </div>
                    <div className="bar-three bar-container m-2">
                        <div className="bar" data-percentage="12"/>
                        <span className="year">En curso</span>
                    </div>
                    <div className="bar-four bar-container m-2">
                        <div className="bar" data-percentage="18"/>
                        <span className="year">Pendientes</span>
                    </div>
                </section>
            </Col>

            <Col className="graphic-table ml-2 mr-2">
                <p className="text-center text-medium mt-3">Próximos turnos</p>
                <p className="mt-4 font-weight-bold">
                    <ul className="list-group">

                        <li className="h5">
                            <FontAwesomeIcon
                                className="mr-5"
                                icon={faSync}
                                size="1x"
                            />
                            [user_name] - 01/05/2021 - 11:30
                            <p className="gray-text">[employee_name]</p>
                        </li>
                        <li className="h5">
                            <FontAwesomeIcon
                                className="mr-5 text-success"
                                icon={faCheckCircle}
                                size="1x"
                            />
                            [user_name] - 01/05/2021 - 11:30
                            <p className="gray-text">[employee_name]</p>
                        </li>
                        <li className="h5">
                            <FontAwesomeIcon
                                className="mr-5 text-danger"
                                icon={faTimesCircle}
                                size="1x"
                            />
                            [user_name] - 01/05/2021 - 11:30
                            <p className="gray-text">[employee_name]</p>
                        </li>
                        <li className="h5">
                            <FontAwesomeIcon
                                className="mr-5"
                                icon={faClock}
                                size="1x"
                            />
                            [user_name] - 01/05/2021 - 11:30
                            <p className="gray-text">[employee_name]</p>
                        </li>
                        <li className="h5">
                            <FontAwesomeIcon
                                className="mr-5 text-success"
                                icon={faCheckCircle}
                                size="1x"
                            />
                            [user_name] - 01/05/2021 - 11:30
                            <p className="gray-text">[employee_name]</p>
                        </li>

                    </ul>

                </p>
            </Col>
        </Row>
    </Container>
);

const mapStateToProps = state => ({
    user: fromState.Session.getEmployee()(state)
});

const {
    deleteEmployeeAsAdminRequested,
    getEmployeeAsAdminRequested
} = SessionActions;

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators({
        deleteEmployeeAsAdminRequested,
        getEmployeeAsAdminRequested
    }, dispatch)
)(DashboardUser);
