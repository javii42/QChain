import constant from 'lodash/constant';

import {
    UPDATE_REGISTER_FORM,
    CLEAR_REGISTER_FORM,
    SET_ZOOM_VALIDATION
} from './types';

export const updateRegisterForm = form => ({type: UPDATE_REGISTER_FORM, ...form});
export const clearRegisterForm = constant({type: CLEAR_REGISTER_FORM});
export const setZoomValidation = zoom => ({type: SET_ZOOM_VALIDATION, zoom});
