/* global window, localStorage */
import {TOKEN_KEY} from '@constants';

import qs from 'querystring';
import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';
import Http from './http';
import * as API from './Urls';

export const queryToString = query => qs.stringify(pickBy(query, identity));
export default class SessionService {
    static signOut() {
        localStorage.clear();
        window.location = '/';
    }

    static fetchCurrent() {
        try {
            return Http.get(API.session);
        } catch (err) {
            console.log('err', err);
            const {hash} = window.location;
            if (hash.length > 2) {
                // window.location = '/';
            }
            window.localStorage.removeItem(TOKEN_KEY);
        }
        return null;
    }

    static validateToken(token) {
        return Http.post('public-api/session', {token});
    }

    static setToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
    }

    static hasSession() {
        return !!localStorage.getItem(TOKEN_KEY);
    }

    static getToken() {
        return localStorage.getItem(TOKEN_KEY);
    }

    static register(body) {
        return Http.post(API.register, body);
    }

    static registerCompanyAsAdmin(body) {
        return Http.post(API.registerCompanyAsAdmin, body);
    }

    static getCompanyAsAdminRequest(body) {
        return Http.get(API.registerCompanyAsAdmin, body);
    }

    static modifyCompanyAsAdminRequest(body) {
        return Http.put(API.registerCompanyAsAdmin, body);
    }

    static updateShift(body) {
        return Http.put(API.shift, body);
    }

    static updateAgenda(body) {
        return Http.put(API.agenda, body);
    }

    static deleteCompanyAsAdminRequest(body) {
        return Http.delete(API.registerCompanyAsAdmin, body);
    }

    static registerEmployeeAsAdmin(body) {
        return Http.post(API.registerEmployeeAsAdmin, body);
    }

    static getEmployeeAsAdminRequest(params) {
        return Http.get(`${API.registerEmployeeAsAdmin}?${queryToString(params)}`);
    }

    static modifyEmployeeAsAdminRequest(body) {
        return Http.put(API.registerEmployeeAsAdmin, body);
    }

    static deleteEmployeeAsAdminRequest(body) {
        return Http.delete(API.registerEmployeeAsAdmin, body);
    }

    static registerWithUsedCode(body) {
        return Http.post(API.duplicatedRequest, body);
    }

    static addContactInformation(body) {
        return Http.post(API.addContactInformation, body);
    }

    static saveLoginInformation(body) {
        return Http.post(API.saveLoginInformation, body);
    }

    static updateVerificationCode(body) {
        return Http.post(API.verificationCode, body);
    }

    static activateUser(body) {
        return Http.post(API.activateUser, body);
    }

    static login(body) {
        return Http.post(API.login, body);
    }

    static loginByCode(body) {
        return Http.post(API.loginByCode, body);
    }

    static loginWithNoCode(body) {
        return Http.post(API.loginWithNoCode, body);
    }

    static validateDocument(body) {
        return Http.post(API.validateDocument, body);
    }

    static branch(param) {
        return Http.get(`${API.branch}/${param}`);
    }

    static sector(param) {
        return Http.get(`${API.sector}/${param}`);
    }

    static employee(param) {
        return Http.get(`${API.employee}/${param}`);
    }

    static shifts(params) {
        return Http.get(`${API.shift}?${queryToString(params)}`);
    }

    static agenda(params) {
        return Http.get(`${API.agenda}?${queryToString(params)}`);
    }

    static companies() {
        return Http.get(API.companies);
    }

    static shift(body) {
        return Http.post(API.shift, body);
    }

    static staticData() {
        return Http.get(API.staticData);
    }

    static publicStaticData() {
        return Http.get(API.publicStaticData);
    }

    static getStreets(params) {
        return Http.get(`${API.getStreets}${params}`);
    }

    static getDoorNumbers(params) {
        return Http.get(`${API.getDoorNumbers}${params}`);
    }

    static getFloors(params) {
        return Http.get(`${API.getFloors}${params}`);
    }

    static getRoomNumbers(params) {
        return Http.get(`${API.getRoomNumbers}${params}`);
    }

    static getBuildings(params) {
        return Http.get(`${API.getBuildings}${params}`);
    }

    static getSideEntries(params) {
        return Http.get(`${API.getSideEntries}${params}`);
    }

    static getHouses(params) {
        return Http.get(`${API.getHouses}${params}`);
    }

    static verifyGeography(body) {
        return Http.post(API.verifyGeography, body);
    }
}
