import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import DashboardAdmin from '@pages/DashboardAdmin';
import RegisterCompanyAsAdmin from '@pages/RegisterCompanyAsAdmin';
import ModifyCompanyAsAdmin from '@pages/ModifyCompanyAsAdmin';
import DeleteCompanyAsAdmin from '@pages/DeleteCompanyAsAdmin';
import RegisterEmployeeAsAdmin from '@pages/RegisterEmployee';
import ModifyEmployee from '@pages/ModifyEmployee';
import DeleteEmployee from '@pages/DeleteEmployee';


const RouterWithSession = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/company" component={RegisterCompanyAsAdmin}/>
            <Route exact path="/modifyCompany" component={ModifyCompanyAsAdmin}/>
            <Route exact path="/deleteCompany" component={DeleteCompanyAsAdmin}/>
            <Route exact path="/employee" component={RegisterEmployeeAsAdmin}/>
            <Route exact path="/modifyEmployee" component={ModifyEmployee}/>
            <Route exact path="/deleteEmployee" component={DeleteEmployee}/>
            <Route component={DashboardAdmin}/>
        </Switch>
    </HashRouter>
);

export default RouterWithSession;
