import {Log} from '@model';

import Http from './http';

export default class UserService {
    static async fetch() {
        const {logs} = await Http.get('api/logs');
        return logs.map(log => new Log(log));
    }
}
