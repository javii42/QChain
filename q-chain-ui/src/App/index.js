import React from 'react';
import {HashRouter} from 'react-router-dom';

import FadeDrop from '@components/FadeDrop';
import ToastMessage from '@components/ToastMessage';

import Footer from './Footer';
import Header from './Header';
import Routes from './Routes';
import ErrorBoundary from './ErrorBoundary';

const App = () => (
    <HashRouter>
        <Header/>
        <ErrorBoundary>
            <FadeDrop/>
            <ToastMessage/>
            <main>
                <Routes/>
            </main>
        </ErrorBoundary>
        <Footer/>
    </HashRouter>
);

export default App;
