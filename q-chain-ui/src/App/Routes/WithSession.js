import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import DashboardAdmin from '@pages/DashboardAdmin';
import RegisterCompanyAsAdmin from '@pages/RegisterCompanyAsAdmin';
import ModifyCompanyAsAdmin from '@pages/ModifyCompanyAsAdmin';


const RouterWithSession = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/company" component={RegisterCompanyAsAdmin}/>
            <Route exact path="/modifyCompany" component={ModifyCompanyAsAdmin}/>
            <Route component={DashboardAdmin}/>
        </Switch>
    </HashRouter>
);

export default RouterWithSession;
