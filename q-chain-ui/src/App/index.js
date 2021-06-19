import React from 'react';
import {HashRouter} from 'react-router-dom';

import FadeDrop from '@components/FadeDrop';
import ToastMessage from '@components/ToastMessage';

import Footer from './Footer';
import Header from './newHeader';
import Routes from './Routes';
import ErrorBoundary from './ErrorBoundary';

const App = ({...props}) => (
    <HashRouter>
        <Header/>
        <ErrorBoundary>
            <FadeDrop/>
            <ToastMessage/>
            <main>
                <Routes/>
            </main>
        </ErrorBoundary>
        <Footer {...props}/>
    </HashRouter>
);

export default App;
