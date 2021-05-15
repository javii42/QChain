/* eslint-disable no-param-reassign */
import get from 'lodash/get';

import pick from 'lodash/pick';

export const getUser = () => ({session: {user}}) => user;
export const getSavingAction = name => ({session: {saving}}) => get(saving, name);
export const getSavingActions = () => ({session: {saving}}) => saving;
export const getLoadingAction = name => ({session: {loading}}) => get(loading, name);
export const getLoadingActions = () => ({session: {loading}}) => loading;
export const getFailedAction = () => ({session: {failed}}) => failed;
export const getSuccessAction = () => ({session: {success}}) => success;
export const getStatusMessage = state => pick(get(state, 'session'), ['status', 'message']);
export const getFlagData = state => pick(get(state, 'session'), ['flagData', 'type']);
