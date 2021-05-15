import React from 'react';

import {useSelector} from 'react-redux';

import get from 'lodash/get';

import Spinners from '@components/Spinner';

import fromState from '@selectors';

export default function ActionFadeDrop() {
    const {flagData, type} = useSelector(fromState.Session.getFlagData);
    if (flagData) {
        return (
            <>
                <div
                    className="modal fade show d-flex align-items-center justify-content-center"
                    role="dialog"
                >
                    <h1 className="text-white">
                        Cargando
                        <Spinners/>
                    </h1>
                </div>
                <div
                    className="modal-backdrop fade show"
                />
            </>
        );
    }
    return null;
}
