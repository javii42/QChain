import constant from 'lodash/constant';

import {
    ERROR_OCCURRED,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCEEDED,
    SIGN_OUT_REQUESTED,
    SESSION_USER_FETCH_REQUESTED,
    SESSION_USER_FETCH_SUCCEEDED,
    LOAD_STORAGE_DATA,
    IS_MOBILE,
    SET_REQUEST_FLAG,
    SET_STATUS_MESSAGE,
    UPDATE_LOGIN_FORM,
    SUBMIT_REGISTER_REQUESTED,
    STATIC_DATA_REQUESTED,
    STATIC_DATA_SUCCEEDED,
    SUBMIT_LOGIN_INFORMATION_REQUESTED,
    REGISTER_REQUEST,
    REGISTER_COMPANY_AS_ADMIN_REQUEST,
    GET_COMPANY_AS_ADMIN_REQUEST,
    GET_COMPANY_AS_ADMIN_SUCCEEDED,
    MODIFY_COMPANY_AS_ADMIN_REQUEST,
    DELETE_COMPANY_AS_ADMIN_REQUEST,
    REGISTER_EMPLOYEE_AS_ADMIN_REQUEST,
    GET_EMPLOYEE_AS_ADMIN_REQUEST,
    GET_EMPLOYEE_AS_ADMIN_SUCCEEDED,
    MODIFY_EMPLOYEE_AS_ADMIN_REQUEST,
    DELETE_EMPLOYEE_AS_ADMIN_REQUEST
} from './types';

export const signInRequested = ({...props}) => ({
    type: SIGN_IN_REQUEST, ...props
});
export const registerRequested = ({...props}) => ({
    type: REGISTER_REQUEST, ...props
});
export const registerCompanyAsAdminRequested = ({...props}) => ({
    type: REGISTER_COMPANY_AS_ADMIN_REQUEST, ...props
});
export const getCompanyAsAdminRequested = ({...props}) => ({
    type: GET_COMPANY_AS_ADMIN_REQUEST, ...props
});
export const getCompanyAsAdminSucceeded = ({...props}) => ({
    type: GET_COMPANY_AS_ADMIN_SUCCEEDED, ...props
});
export const modifyCompanyAsAdminRequested = ({...props}) => ({
    type: MODIFY_COMPANY_AS_ADMIN_REQUEST, ...props
});
export const deleteCompanyAsAdminRequested = ({...props}) => ({
    type: DELETE_COMPANY_AS_ADMIN_REQUEST, ...props
});
export const registerEmployeeAsAdminRequested = ({...props}) => ({
    type: REGISTER_EMPLOYEE_AS_ADMIN_REQUEST, ...props
});
export const getEmployeeAsAdminRequested = ({...props}) => ({
    type: GET_EMPLOYEE_AS_ADMIN_REQUEST, ...props
});
export const getEmployeeAsAdminSucceeded = ({...props}) => ({
    type: GET_EMPLOYEE_AS_ADMIN_SUCCEEDED, ...props
});
export const modifyEmployeeAsAdminRequested = ({...props}) => ({
    type: MODIFY_EMPLOYEE_AS_ADMIN_REQUEST, ...props
});
export const deleteEmployeeAsAdminRequested = ({...props}) => ({
    type: DELETE_EMPLOYEE_AS_ADMIN_REQUEST, ...props
});
export const signInSucceeded = ({token, user}) => ({type: SIGN_IN_SUCCEEDED, token, user});
export const requestFetchSessionUser = constant({type: SESSION_USER_FETCH_REQUESTED});
export const receiveSessionUser = user => ({type: SESSION_USER_FETCH_SUCCEEDED, user});
export const requestSignOut = constant({type: SIGN_OUT_REQUESTED});
export const setIsMobile = isMobile => ({type: IS_MOBILE, isMobile});
export const handleError = ({failed, err}) => ({
    type: ERROR_OCCURRED,
    err,
    failed
});
export const loadStorageData = constant({type: LOAD_STORAGE_DATA});
export const setRequestFlag = (flag, requestType) => ({type: SET_REQUEST_FLAG, flag, requestType});
export const setStatusMessage = (status, message) => ({type: SET_STATUS_MESSAGE, status, message});
export const updateLoginForm = props => ({
    type: UPDATE_LOGIN_FORM, ...props
});

export const submitRegisterRequested = ({...props}) => ({type: SUBMIT_REGISTER_REQUESTED, ...props});
export const submitLoginInformation = (mail, tel) => ({type: SUBMIT_LOGIN_INFORMATION_REQUESTED, mail, tel});
export const staticDataRequested = constant({type: STATIC_DATA_REQUESTED});
export const staticDataSucceeded = props => ({type: STATIC_DATA_SUCCEEDED, ...props});
