/* eslint-disable no-param-reassign */
import get from 'lodash/get';

import pick from 'lodash/pick';

export const getUser = () => ({session: {user}}) => user;
export const getEmployee = () => ({session: {employee}}) => employee;
export const getSavingAction = name => ({session: {saving}}) => get(saving, name);
export const getSavingActions = () => ({session: {saving}}) => saving;
export const getLoadingAction = name => ({session: {loading}}) => get(loading, name);
export const getLoadingActions = () => ({session: {loading}}) => loading;
export const getFailedAction = () => ({session: {failed}}) => failed;
export const getSuccessAction = () => ({session: {success}}) => success;
export const getStatusMessage = state => pick(get(state, 'session'), ['status', 'message']);
export const getFlagData = state => pick(get(state, 'session'), ['flagData', 'type']);
export const getCompany = () => ({session: {company}}) => company;
export const getCompanies = () => ({session: {companies}}) => companies;
export const getBranch = () => ({session: {branch}}) => branch;
export const getSector = () => ({session: {sector}}) => sector;
export const getShifts = () => ({session: {shifts}}) => shifts;
export const getAgenda = () => ({session: {agenda}}) => agenda;
export const getEmployees = () => ({session: {employees}}) => employees;
