/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* global localStorage, window */
import {
    call,
    put,
    takeLatest,
    all,
    select
} from 'redux-saga/effects';

import SessionService from '@services/Session';
import fromState from '@selectors';
import Navigation from '@util/navigation';
import {
    ERROR,
    LOADING,
    SUCCESS,
    UPDATED,
    loginStatus
} from '@constants';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import {User} from '@model';

import {
    SIGN_IN_REQUEST,
    SIGN_OUT_REQUESTED,
    SESSION_USER_FETCH_REQUESTED,
    LOAD_STORAGE_DATA,
    REGISTER_REQUEST,
    ACTIVATE_USER,
    STATIC_DATA_REQUESTED,
    SUBMIT_LOGIN_INFORMATION_REQUESTED,
    REGISTER_COMPANY_AS_ADMIN_REQUEST
} from './types';

import {
    signInSucceeded,
    handleError,
    setRequestFlag,
    setStatusMessage,
    updateSegmentData,
    staticDataSucceeded
} from './actions';

function* signOut() {
    yield call(SessionService.signOut);
}

function* getSessionUser() {
    try {

    } catch (error) {
        yield put(handleError(error));
    }
}

function* signIn({
    user_mail,
    user_password
}) {
    try {
        yield put(setRequestFlag(true, LOADING));
        const result = yield call(SessionService.login, {user_mail, user_password});

        const token = get(result, 'token');
        const user = get(result, 'searchedUser');

        if (token && user) {
            yield localStorage.setItem('token', token);
            yield localStorage.setItem('user', JSON.stringify(user));
            yield put(setStatusMessage(SUCCESS, 'BIENVENIDO AL SISTEMA QCHAIN'));
            yield put(signInSucceeded({user}));
            yield put(setRequestFlag(false, ''));
            // setTimeout(() => { window.location = '/'; }, 2000);
            return;
        }
        yield put(setStatusMessage(ERROR, get(result, 'status', 'ERROR')));
    } catch (error) {
        yield put(setStatusMessage(ERROR));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

function* register({
    user_mail,
    user_password,
    user_name,
    user_lastname,
    user_birthday,
    user_doc_type,
    user_doc_number
}) {
    try {
        yield put(setRequestFlag(true, LOADING));

        const result = yield call(SessionService.register, {
            user_mail,
            user_password,
            user_name,
            user_lastname,
            user_birthday,
            user_doc_type,
            user_doc_number
        });

        if (result) {
            // yield localStorage.setItem('token', token);
            yield put(setStatusMessage(SUCCESS, 'USUARIO CREADO CORRECTAMENTE'));
            // yield put(signInSucceeded({user}));
            // yield put(setRequestFlag(false, ''));
            // setTimeout(() => { window.location = '/'; }, 2000);
            return;
        }
        yield put(setStatusMessage(ERROR, get(result, 'status', 'ERROR')));
    } catch (error) {
        yield put(setStatusMessage(ERROR));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

function* registerCompanyAsAdmin({
    company_name,
    company_mail,
    company_doc_type,
    company_doc_number,
    user_mail,
    user_password,
    user_name,
    user_lastname,
    user_birthday,
    user_doc_type,
    user_doc_number
}) {
    try {
        yield put(setRequestFlag(true, LOADING));

        const result = yield call(SessionService.registerCompanyAsAdmin, {
            company_name,
            company_mail,
            company_doc_type,
            company_doc_number,
            user_mail,
            user_password,
            user_name,
            user_lastname,
            user_birthday,
            user_doc_type,
            user_doc_number
        });

        if (get(result, '_id')) {
            // yield localStorage.setItem('token', token);
            yield put(setStatusMessage(SUCCESS, 'COMPAÑÍA Y USUARIO GENERADOS CORRECTAMENTE'));
            // yield put(signInSucceeded({user}));
            // yield put(setRequestFlag(false, ''));
            // setTimeout(() => { window.location = '/'; }, 2000);
            return;
        }
        yield put(setStatusMessage(ERROR, get(result, 'status', 'ERROR')));
    } catch (error) {
        yield put(setStatusMessage(ERROR));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

export default function* sessionSaga() {
    yield all([
        takeLatest(SESSION_USER_FETCH_REQUESTED, getSessionUser),
        takeLatest(SIGN_OUT_REQUESTED, signOut),
        takeLatest(SIGN_IN_REQUEST, signIn),
        takeLatest(REGISTER_REQUEST, register),
        takeLatest(REGISTER_COMPANY_AS_ADMIN_REQUEST, registerCompanyAsAdmin)
    ]);
}
