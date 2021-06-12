/* global localStorage */
import React, {
    useEffect,
    useState
} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import DashboardAdmin from '@pages/DashboardAdmin';
import GenericDashboard from '@pages/Dashboard';
import RegisterCompanyAsAdmin from '@pages/RegisterCompanyAsAdmin';
import ModifyCompanyAsAdmin from '@pages/ModifyCompanyAsAdmin';
import DeleteCompanyAsAdmin from '@pages/DeleteCompanyAsAdmin';
import RegisterEmployeeAsAdmin from '@pages/RegisterEmployee';
import ModifyEmployee from '@pages/ModifyEmployee';
import DeleteEmployee from '@pages/DeleteEmployee';
import Shift from '@pages/Shift';
import ShiftTable from '@pages/ShiftTable';
import AgendaTable from '@pages/AgendaTable';
import DashboardUser from '@pages/DashboardUser';

import {
    get, isPlainObject, isString
} from 'lodash';

const getParsedUser = user => {
    if (user && isString(user)) {
        return JSON.parse(user);
    }
    if (user && isPlainObject(user)) {
        return user;
    }
    return false;
};

const getRole = user => {
    const parsedUser = getParsedUser(user);
    return get(parsedUser, 'rol');
};

const RouterWithSession = () => {
    const [role, setRole] = useState();

    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');

    useEffect(() => {
        token = localStorage.getItem('token');
        user = localStorage.getItem('user');
        if (!role) {
            setRole(getRole(user));
        }
    }, []);

    return (
        <HashRouter>
            <Switch>
                <Route exact path="/company" component={RegisterCompanyAsAdmin}/>
                <Route exact path="/modifyCompany" component={ModifyCompanyAsAdmin}/>
                <Route exact path="/deleteCompany" component={DeleteCompanyAsAdmin}/>
                <Route exact path="/employee" component={RegisterEmployeeAsAdmin}/>
                <Route exact path="/modifyEmployee" component={ModifyEmployee}/>
                <Route exact path="/deleteEmployee" component={DeleteEmployee}/>
                <Route exact path="/shift/:id/:name" component={Shift}/>
                <Route exact path="/myShifts/:id" component={ShiftTable}/>
                <Route exact path="/myAgenda" component={AgendaTable}/>
                <Route exact path="/dashboardUser" component={DashboardUser}/>
                {role !== 'Genérico'
                    ? <Route component={DashboardAdmin}/> : <Route component={GenericDashboard}/>}
            </Switch>
        </HashRouter>
    );
};

export default RouterWithSession;
