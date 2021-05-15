/* global window, localStorage */
import {TOKEN_KEY} from '@constants';

import * as API from './Urls';
import Http from './http';


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

    static registerEmployeeAsAdmin(body) {
        return Http.post(API.registerEmployeeAsAdmin, body);
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
