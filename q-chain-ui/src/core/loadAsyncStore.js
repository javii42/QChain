import {SessionActions} from '@actions';

const {
    loadStorageData
} = SessionActions;

export default function loadAsyncState(store) {
    store.dispatch(loadStorageData());
    /* store.dispatch(requestFetchSessionUser());
    store.dispatch(staticDataRequested()); */
    return store;
}
