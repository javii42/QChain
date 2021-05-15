/* global window */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import logger from '@util/logger';

class ErrorBoundary extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error) {
        if (error) {
            // setTimeout(() => { window.location = '/'; }, 3500);
            return {hasError: true};
        }
        if (!error) {
            return {hasError: false};
        }
        return null;
    }

    componentDidCatch(error) {
        logger.error(error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <main className="mt-20 container">
                    <h1 className="text-center">
                        Algo salio mal. Comuníquese con la administración sobre lo que estaba haciendo al momento de ocurrir el error
                    </h1>
                </main>
            );
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default ErrorBoundary;
