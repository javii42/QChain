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

import {set} from 'lodash';
import {
    SIGN_IN_REQUEST,
    SIGN_OUT_REQUESTED,
    SESSION_USER_FETCH_REQUESTED,
    LOAD_STORAGE_DATA,
    REGISTER_REQUEST,
    ACTIVATE_USER,
    STATIC_DATA_REQUESTED,
    SUBMIT_LOGIN_INFORMATION_REQUESTED,
    REGISTER_COMPANY_AS_ADMIN_REQUEST,
    GET_COMPANY_AS_ADMIN_REQUEST,
    MODIFY_COMPANY_AS_ADMIN_REQUEST,
    DELETE_COMPANY_AS_ADMIN_REQUEST,
    REGISTER_EMPLOYEE_AS_ADMIN_REQUEST,
    GET_EMPLOYEE_AS_ADMIN_REQUEST,
    MODIFY_EMPLOYEE_AS_ADMIN_REQUEST,
    DELETE_EMPLOYEE_AS_ADMIN_REQUEST,
    BRANCH_REQUESTED,
    SECTOR_REQUESTED,
    EMPLOYEE_REQUESTED,
    SHIFT_REQUESTED,
    SHIFTS_REQUESTED,
    AGENDA_REQUESTED,
    COMPANIES_REQUESTED,
    UPDATE_SHIFT
} from './types';

import {
    signInSucceeded,
    handleError,
    setRequestFlag,
    setStatusMessage,
    updateSegmentData,
    staticDataSucceeded,
    getCompanyAsAdminSucceeded,
    getEmployeeAsAdminSucceeded,
    branchSucceeded,
    sectorSucceeded,
    employeeSucceeded,
    companiesSucceeded,
    shiftsSucceeded,
    agendaSucceeded
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
        const rol = get(result, 'rol');

        if (token && user) {
            yield localStorage.setItem('token', token);
            yield localStorage.setItem('user', JSON.stringify(user));
            yield localStorage.setItem('rol', JSON.stringify(rol));
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

function* loadStorageData() {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            yield put(signInSucceeded({user}));
        }
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

function* getCompanyAsAdminRequest({
    _id,
    company_doc_type,
    company_doc_number
}) {
    try {
        yield put(setRequestFlag(true, LOADING));

        const result = yield call(SessionService.getCompanyAsAdminRequest, {
            _id,
            company_doc_type,
            company_doc_number
        });

        if (get(result, '_id')) {
            // yield localStorage.setItem('token', token);
            yield put(setStatusMessage(SUCCESS, 'DATOS DE COMPAÑÍA CORRECTAMENTE OBTENIDOS'));
            yield put(getCompanyAsAdminSucceeded({company: result}));
            // yield put(signInSucceeded({user}));
            // yield put(setRequestFlag(false, ''));
            // setTimeout(() => { window.location = '/'; }, 2000);
            return;
        }
        yield put(setStatusMessage(ERROR, get(result, 'status', 'ERROR')));
    } catch (error) {
        console.log('error', error);
        yield put(setStatusMessage(ERROR));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

function* modifyCompanyAsAdminRequest({
    _id,
    company_name,
    company_mail
}) {
    try {
        yield put(setRequestFlag(true, LOADING));

        const objToSend = {
            _id,
            company_name,
            company_mail
        };

        if (!objToSend._id) {
            const company = yield select(state => fromState.Session.getCompany()(state));
            set(objToSend, '_id', get(company, '_id'));
        }

        const result = yield call(SessionService.modifyCompanyAsAdminRequest, objToSend);

        if (get(result, '_id')) {
            // yield localStorage.setItem('token', token);
            yield put(setStatusMessage(SUCCESS, 'DATOS DE COMPAÑÍA CORRECTAMENTE MODIFICADOS'));
            yield put(getCompanyAsAdminSucceeded({company: result}));
            // yield put(signInSucceeded({user}));
            // yield put(setRequestFlag(false, ''));
            // setTimeout(() => { window.location = '/'; }, 2000);
            return;
        }
        console.log('result', result);
        yield put(setStatusMessage(ERROR, get(result, 'status', 'ERROR')));
    } catch (error) {
        console.log('error', error);
        yield put(setStatusMessage(ERROR));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

function* deleteCompanyAsAdminRequest({
    _id
}) {
    try {
        yield put(setRequestFlag(true, LOADING));

        let finalId = _id;

        if (!finalId) {
            const company = yield select(state => fromState.Session.getCompany()(state));
            finalId = get(company, '_id');
        }

        const result = yield call(SessionService.deleteCompanyAsAdminRequest, {_id: finalId});

        if (get(result, '_id')) {
            // yield localStorage.setItem('token', token);
            yield put(setStatusMessage(SUCCESS, 'LA COMPAÑÍA FUE ELIMINADA'));
            yield put(getCompanyAsAdminSucceeded({company: result}));
            // yield put(signInSucceeded({user}));
            // yield put(setRequestFlag(false, ''));
            // setTimeout(() => { window.location = '/'; }, 2000);
            return;
        }
        console.log('result', result);
        yield put(setStatusMessage(ERROR, get(result, 'status', 'ERROR')));
    } catch (error) {
        console.log('error', error);
        yield put(setStatusMessage(ERROR));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

function* registerEmployeeAsAdmin({
    company_id,
    user_id,
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

        const result = yield call(SessionService.registerEmployeeAsAdmin, {
            company_id,
            user_id,
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
            yield put(setStatusMessage(SUCCESS, 'USUARIO GENERADO CORRECTAMENTE'));
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

function* getEmployeeAsAdminRequest({
    _id,
    user_doc_type,
    user_doc_number
}) {
    try {
        yield put(setRequestFlag(true, LOADING));
        const objToSend = {
            _id,
            user_doc_type,
            user_doc_number
        };
        /* if (!get(objToSend, 'company_id')) {
            const user = yield select(state => fromState.Session.getUser()(state));
            set(objToSend, 'company_id', get(user, 'company_id'));
        } */

        const result = yield call(SessionService.getEmployeeAsAdminRequest, objToSend);

        if (get(result, '_id')) {
            // yield localStorage.setItem('token', token);
            yield put(setStatusMessage(SUCCESS, 'DATOS DE EMPLEADO CORRECTAMENTE OBTENIDOS'));
            yield put(getEmployeeAsAdminSucceeded({employee: result}));
            // yield put(signInSucceeded({user}));
            // yield put(setRequestFlag(false, ''));
            // setTimeout(() => { window.location = '/'; }, 2000);
            return;
        }
        console.log('result', result);
        yield put(setStatusMessage(ERROR, get(result, 'status', 'ERROR')));
    } catch (error) {
        console.log('error', error);
        yield put(setStatusMessage(ERROR));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

function* modifyEmployeeAsAdminRequest({
    _id,
    user_name,
    user_mail
}) {
    try {
        yield put(setRequestFlag(true, LOADING));

        const objToSend = {
            _id,
            user_name,
            user_mail
        };

        if (!objToSend._id) {
            const employee = yield select(state => fromState.Session.getEmployee()(state));
            set(objToSend, '_id', get(employee, '_id'));
        }

        const result = yield call(SessionService.modifyEmployeeAsAdminRequest, objToSend);

        if (get(result, '_id')) {
            // yield localStorage.setItem('token', token);
            yield put(setStatusMessage(SUCCESS, 'DATOS DE EMPLEADO CORRECTAMENTE MODIFICADOS'));
            yield put(getEmployeeAsAdminSucceeded({employee: result}));
            // yield put(signInSucceeded({user}));
            // yield put(setRequestFlag(false, ''));
            // setTimeout(() => { window.location = '/'; }, 2000);
            return;
        }
        console.log('result', result);
        yield put(setStatusMessage(ERROR, get(result, 'status', 'ERROR')));
    } catch (error) {
        console.log('error', error);
        yield put(setStatusMessage(ERROR));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

function* deleteEmployeeAsAdminRequest({
    _id
}) {
    try {
        yield put(setRequestFlag(true, LOADING));

        let finalId = _id;

        if (!finalId) {
            const employee = yield select(state => fromState.Session.getEmployee()(state));
            finalId = get(employee, '_id');
        }

        const result = yield call(SessionService.deleteEmployeeAsAdminRequest, {_id: finalId});

        if (get(result, '_id')) {
            // yield localStorage.setItem('token', token);
            yield put(setStatusMessage(SUCCESS, 'EL EMPLEADO FUE ELIMINADO'));
            yield put(getEmployeeAsAdminSucceeded({employee: result}));
            // yield put(signInSucceeded({user}));
            // yield put(setRequestFlag(false, ''));
            // setTimeout(() => { window.location = '/'; }, 2000);
            return;
        }
        console.log('result', result);
        yield put(setStatusMessage(ERROR, get(result, 'status', 'ERROR')));
    } catch (error) {
        console.log('error', error);
        yield put(setStatusMessage(ERROR));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

function* branchRequested({
    company_id
}) {
    try {
        yield put(setRequestFlag(true, LOADING));
        const result = yield call(SessionService.branch, '60a9014477e7d70fd6f5990c');

        if (result) {
            // yield localStorage.setItem('token', token);
            // yield put(setStatusMessage(SUCCESS, 'EL EMPLEADO FUE ELIMINADO'));
            yield put(branchSucceeded({branch: result}));
            // yield put(signInSucceeded({user}));
            // yield put(setRequestFlag(false, ''));
            // setTimeout(() => { window.location = '/'; }, 2000);
            return;
        }
        console.log('result', result);
        yield put(setStatusMessage(ERROR, get(result, 'status', 'ERROR')));
    } catch (error) {
        console.log('error', error);
        yield put(setStatusMessage(ERROR));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

function* sectorRequested({
    company_id
}) {
    try {
        yield put(setRequestFlag(true, LOADING));

        const result = yield call(SessionService.sector, '60a9014477e7d70fd6f5990c');

        if (result) {
            // yield localStorage.setItem('token', token);
            // yield put(setStatusMessage(SUCCESS, 'EL EMPLEADO FUE ELIMINADO'));
            yield put(sectorSucceeded({sector: result}));
            // yield put(signInSucceeded({user}));
            // yield put(setRequestFlag(false, ''));
            // setTimeout(() => { window.location = '/'; }, 2000);
            return;
        }
    } catch (error) {
        console.log('error', error);
        yield put(setStatusMessage(ERROR));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

function* employeeRequested({
    branch_id
}) {
    try {
        yield put(setRequestFlag(true, LOADING));

        /* let finalId = _id;

        if (!finalId) {
            const employee = yield select(state => fromState.Session.getEmployee()(state));
            finalId = get(employee, '_id');
        } */

        const result = yield call(SessionService.employee, '60ac475558b0ef980fba375e');

        if (result) {
            // yield localStorage.setItem('token', token);
            // yield put(setStatusMessage(SUCCESS, 'EL EMPLEADO FUE ELIMINADO'));
            yield put(branchSucceeded({employees: result}));
            // yield put(signInSucceeded({user}));
            // yield put(setRequestFlag(false, ''));
            // setTimeout(() => { window.location = '/'; }, 2000);
            return;
        }
    } catch (error) {
        console.log('error', error);
        yield put(setStatusMessage(ERROR));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

function* shiftRequested({
    branch_id,
    user_id,
    user_data,
    company_name,
    employee_name,
    shift_address,
    ce_id,
    shift_call,
    shift_duration,
    shift_date,
    shift_start,
    shift_comment,
    shift_status
}) {
    try {
        yield put(setRequestFlag(true, LOADING));

        /* let finalId = _id;

        if (!finalId) {
            const employee = yield select(state => fromState.Session.getEmployee()(state));
            finalId = get(employee, '_id');
        } */

        console.log(shift_address);

        const result = yield call(SessionService.shift, {
            branch_id,
            user_id,
            user_data,
            company_name,
            employee_name,
            shift_address,
            ce_id,
            shift_call,
            shift_duration,
            shift_date,
            shift_start,
            shift_comment,
            shift_status
        });

        if (result) {
            // yield localStorage.setItem('token', token);
            // yield put(setStatusMessage(SUCCESS, 'EL EMPLEADO FUE ELIMINADO'));
            // yield put(branchSucceeded({employees: result}));
            // yield put(signInSucceeded({user}));
            // yield put(setRequestFlag(false, ''));
            // setTimeout(() => { window.location = '/'; }, 2000);
            return;
        }
    } catch (error) {
        console.log('error', error);
        yield put(setStatusMessage(ERROR));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

function* agendaRequested({
    ce_id
}) {
    try {
        yield put(setRequestFlag(true, LOADING));

        /* let finalId = _id;

        if (!finalId) {
            const employee = yield select(state => fromState.Session.getEmployee()(state));
            finalId = get(employee, '_id');
        } */

        const result = yield call(SessionService.agenda, {ce_id});

        if (result) {
            yield put(agendaSucceeded({agenda: result}));
            // yield localStorage.setItem('token', token);
            // yield put(setStatusMessage(SUCCESS, 'EL EMPLEADO FUE ELIMINADO'));
            // yield put(branchSucceeded({employees: result}));
            // yield put(signInSucceeded({user}));
            // yield put(setRequestFlag(false, ''));
            // setTimeout(() => { window.location = '/'; }, 2000);
            return;
        }
    } catch (error) {
        console.log('error', error);
        yield put(setStatusMessage(ERROR));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

function* companiesRequested({}) {
    try {
        yield put(setRequestFlag(true, LOADING));

        const result = yield call(SessionService.companies);

        if (result) {
            yield put(companiesSucceeded({companies: result}));
            // yield localStorage.setItem('token', token);
            // yield put(setStatusMessage(SUCCESS, 'EL EMPLEADO FUE ELIMINADO'));
            // yield put(branchSucceeded({employees: result}));
            // yield put(signInSucceeded({user}));
            // yield put(setRequestFlag(false, ''));
            // setTimeout(() => { window.location = '/'; }, 2000);
            return;
        }
    } catch (error) {
        console.log('error', error);
        yield put(setStatusMessage(ERROR));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

function* shiftsRequested({
    user_id
}) {
    try {
        yield put(setRequestFlag(true, LOADING));

        const result = yield call(SessionService.shifts, {user_id});

        console.log('result', result);
        if (result) {
            yield put(shiftsSucceeded({shifts: result}));
            // yield localStorage.setItem('token', token);
            // yield put(setStatusMessage(SUCCESS, 'EL EMPLEADO FUE ELIMINADO'));
            // yield put(branchSucceeded({employees: result}));
            // yield put(signInSucceeded({user}));
            // yield put(setRequestFlag(false, ''));
            // setTimeout(() => { window.location = '/'; }, 2000);
            return;
        }
    } catch (error) {
        console.log('error', error);
        yield put(setStatusMessage(ERROR));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

function* updateShift({
    _id,
    branch_id,
    user_id,
    user_data,
    company_name,
    employee_name,
    ce_id,
    shift_call,
    shift_duration,
    shift_date,
    shift_start,
    shift_comment,
    shift_address,
    shift_status
}) {
    try {
        yield put(setRequestFlag(true, LOADING));

        const result = yield call(SessionService.updateShift, {
            _id,
            branch_id,
            user_id,
            user_data,
            company_name,
            employee_name,
            ce_id,
            shift_call,
            shift_duration,
            shift_date,
            shift_start,
            shift_comment,
            shift_status,
            shift_address
        });

        console.log('result', result);
        if (result) {
            yield put(shiftsSucceeded({shifts: result}));
            // yield localStorage.setItem('token', token);
            // yield put(setStatusMessage(SUCCESS, 'EL EMPLEADO FUE ELIMINADO'));
            // yield put(branchSucceeded({employees: result}));
            // yield put(signInSucceeded({user}));
            // yield put(setRequestFlag(false, ''));
            // setTimeout(() => { window.location = '/'; }, 2000);
            return;
        }
    } catch (error) {
        console.log('error', error);
        yield put(setStatusMessage(ERROR));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

export default function* sessionSaga() {
    yield all([
        takeLatest(SESSION_USER_FETCH_REQUESTED, getSessionUser),
        takeLatest(LOAD_STORAGE_DATA, loadStorageData),
        takeLatest(SIGN_OUT_REQUESTED, signOut),
        takeLatest(SIGN_IN_REQUEST, signIn),
        takeLatest(REGISTER_REQUEST, register),
        takeLatest(REGISTER_COMPANY_AS_ADMIN_REQUEST, registerCompanyAsAdmin),
        takeLatest(GET_COMPANY_AS_ADMIN_REQUEST, getCompanyAsAdminRequest),
        takeLatest(MODIFY_COMPANY_AS_ADMIN_REQUEST, modifyCompanyAsAdminRequest),
        takeLatest(DELETE_COMPANY_AS_ADMIN_REQUEST, deleteCompanyAsAdminRequest),
        takeLatest(REGISTER_EMPLOYEE_AS_ADMIN_REQUEST, registerEmployeeAsAdmin),
        takeLatest(GET_EMPLOYEE_AS_ADMIN_REQUEST, getEmployeeAsAdminRequest),
        takeLatest(MODIFY_EMPLOYEE_AS_ADMIN_REQUEST, modifyEmployeeAsAdminRequest),
        takeLatest(DELETE_EMPLOYEE_AS_ADMIN_REQUEST, deleteEmployeeAsAdminRequest),
        takeLatest(BRANCH_REQUESTED, branchRequested),
        takeLatest(SECTOR_REQUESTED, sectorRequested),
        takeLatest(EMPLOYEE_REQUESTED, employeeRequested),
        takeLatest(SHIFT_REQUESTED, shiftRequested),
        takeLatest(SHIFTS_REQUESTED, shiftsRequested),
        takeLatest(AGENDA_REQUESTED, agendaRequested),
        takeLatest(COMPANIES_REQUESTED, companiesRequested),
        takeLatest(UPDATE_SHIFT, updateShift)
    ]);
}
