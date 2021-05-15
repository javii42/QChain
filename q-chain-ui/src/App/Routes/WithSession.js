import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import DashboardAdmin from '@pages/DashboardAdmin';
import RegisterCompanyAsAdmin from '@pages/RegisterCompanyAsAdmin';
import ModifyCompanyAsAdmin from '@pages/ModifyCompanyAsAdmin';
import RegisterEmployeeAsAdmin from '@pages/RegisterEmployee';


const RouterWithSession = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/company" component={RegisterCompanyAsAdmin}/>
            <Route exact path="/employee" component={RegisterEmployeeAsAdmin}/>
            <Route exact path="/modifyCompany" component={ModifyCompanyAsAdmin}/>
            <Route component={DashboardAdmin}/>
        </Switch>
    </HashRouter>
);

export default RouterWithSession;
