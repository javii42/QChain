import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';

const Root = ({store, App}) => (
    <Provider store={store}>
        <App/>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.shape({}).isRequired,
    App: PropTypes.func.isRequired
};

export default Root;
