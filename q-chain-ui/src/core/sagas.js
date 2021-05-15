import {all} from 'redux-saga/effects';

import Session from './state/Session/sagas';

export default function* rootSagas() {
    yield all([
        Session()
    ]);
}
