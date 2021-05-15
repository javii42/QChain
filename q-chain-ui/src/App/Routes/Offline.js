import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import Dashboard from '@pages/Dashboard';

export default () => (
    <HashRouter>
        <Switch>
            {/*             <Route exact path={routes.map} component={Map}/>
            <Route exact path={routes.register} component={Register}/>
            <Route exact path={`${routes.registerConfirmation}/:user?`} component={RegisterConfirmation}/>
            <Route exact path={routes.signin} component={SignIn}/>
            <Route path={routes.demo} component={Demo}/> */}
            <Route component={Dashboard}/>
        </Switch>
    </HashRouter>
);
