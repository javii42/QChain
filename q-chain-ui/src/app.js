/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import initReactFastclick from 'react-fastclick';

import head from 'lodash/head';

import Root from './containers/Root';
import store from './core/store';
import 'sass/app.scss';
import App from './App/index';

initReactFastclick();

ReactDOM.render(
    <AppContainer>
        <Root store={store} App={App}/>
    </AppContainer>,
    head(document.getElementsByTagName('article'))
);
