import {
    UPDATE_REGISTER_FORM,
    CLEAR_REGISTER_FORM,
    SET_ZOOM_VALIDATION
} from './types';

const initialState = {
};

export default function register(state = initialState, {type, ...props}) {
    switch (type) {
        case UPDATE_REGISTER_FORM:
            return {...state, fields: props};
        case CLEAR_REGISTER_FORM:
            return {...state, fields: {}};
        case SET_ZOOM_VALIDATION:
            return {...state, ...props};
        default:
            return state;
    }
}
