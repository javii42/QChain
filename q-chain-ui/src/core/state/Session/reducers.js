import {
    LOADING,
    SAVING,
    SESSION_USER_FETCH_SUCCEEDED,
    SIGN_IN_SUCCEEDED,
    ERROR_OCCURRED,
    SET_REQUEST_FLAG,
    SET_STATUS_MESSAGE,
    UPDATE_LOGIN_FORM,
    STATIC_DATA_SUCCEEDED,
    SUBMIT_DOCUMENT_VALIDATION,
    SUBMIT_LOGIN_INFORMATION_REQUESTED,
    GET_COMPANY_AS_ADMIN_SUCCEEDED,
    GET_EMPLOYEE_AS_ADMIN_SUCCEEDED,
    BRANCH_SUCCEEDED,
    SECTOR_SUCCEEDED,
    EMPLOYEE_SUCCEEDED,
    AGENDA_SUCCEEDED
} from './types';

export default function session(
    state = {
        currentLanguage: 'es',
        flag: false,
        message: null,
        failed: false,
        token: null,
        username: '',
        password: '',
        code: '',
        user: {},
        segment: {},
        geography: {},
        branch: [],
        sector: [],
        employees: []
    },
    {type, ...props}
) {
    switch (type) {
        case SESSION_USER_FETCH_SUCCEEDED:
            return {
                ...state,
                user: props.user,
                roles: props.user.roles
            };
        case LOADING:
            return {...state, err: null, loading: {...state.loading, ...props}};
        case SAVING:
            return {...state, err: null, saving: {...state.saving, ...props}};
        case SET_REQUEST_FLAG:
            return {
                ...state,
                flagData: props.flag,
                type: props.requestType
            };
        case SET_STATUS_MESSAGE:
        case UPDATE_LOGIN_FORM:
        case SIGN_IN_SUCCEEDED:
        case ERROR_OCCURRED:
        case STATIC_DATA_SUCCEEDED:
        case SUBMIT_DOCUMENT_VALIDATION:
        case SUBMIT_LOGIN_INFORMATION_REQUESTED:
        case GET_COMPANY_AS_ADMIN_SUCCEEDED:
        case GET_EMPLOYEE_AS_ADMIN_SUCCEEDED:
        case BRANCH_SUCCEEDED:
        case SECTOR_SUCCEEDED:
        case EMPLOYEE_SUCCEEDED:
        case AGENDA_SUCCEEDED:
            return {
                ...state,
                ...props
            };
        default:
            return state;
    }
}
