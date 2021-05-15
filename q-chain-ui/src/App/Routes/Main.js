/* global localStorage */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import fromState from '@selectors';
import {User} from '@model';
import RouterWithSession from './WithSession';
import RouterOffline from './Offline';

const checkSession = () => localStorage.getItem('token');

const App = ({
    user
}) => {
    const session = checkSession();

    if (session) {
        return (
            <RouterWithSession/>
        );
    }

    return (
        <RouterOffline/>
    );
};

App.propTypes = {
    user: PropTypes.instanceOf(User),
    loadingAction: PropTypes.shape({
        sessionLoading: PropTypes.bool
    })
};

App.defaultProps = {
    loadingAction: null,
    user: null
};

const mapStateToProps = state =>
    // const user = fromState.Session.getUser()(state);
    ({
        user: {}
    });
export default connect(
    mapStateToProps
)(App);
