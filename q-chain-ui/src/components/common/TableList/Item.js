/* eslint-disable react/prop-types */
import React from 'react';
import {
    Button,
    ButtonGroup
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faEdit,
    faEraser,
    faEye
} from '@fortawesome/free-solid-svg-icons';
import {
    filter,
    get,
    includes,
    isArray,
    isEmpty,
    isFunction,
    join,
    map,
    uniqueId
} from 'lodash';

import Detail from './Detail';

const Item = ({
    info,
    onDelete,
    primaryKey,
    onRecoveryPassword,
    columns
}) => {
    const noActions = filter(columns, c => c.draw && !c.actions);
    const actions = filter(columns, c => c.draw && c.actions);
    return (
        <tr className="text-user-table">
            {map(noActions, column => {
                if (column.draw) {
                    if (column.detail) {
                        return (
                            <td key={uniqueId('item')} className={column.className || 'text-center'}>
                                <Detail
                                    info={info}
                                    columns={columns}
                                >
                                    <div >
                                        <FontAwesomeIcon icon={faEye}/>
                                    &nbsp;
                                        {isFunction(column.label) && column.label(info)}
                                        {!isFunction(column.label) && !isArray(column.label) && get(info, column.label) }
                                        {
                                            !isFunction(column.label) && isArray(column.label)
                                        && join(map(column.label, e => get(info, e)), ', ')
                                        }
                                    </div>
                                </Detail>
                            </td>
                        );
                    }
                    return (
                        <td key={uniqueId('item')} className={column.className || 'text-center'}>
                            {!isFunction(column.label) && !isArray(column.label) && get(info, column.label) }
                            {isFunction(column.label) && column.label(info)}
                            {
                                !isFunction(column.label) && isArray(column.label)
                            && join(map(column.label, e => get(info, e)), ', ')
                            }
                        </td>
                    );
                }
                return null;
            })}
            {!isEmpty(actions) && (
                <td className="text-center">
                    <ButtonGroup className="w-200">
                        {!includes(info.roles, 'Coordinador Nacional') && map(actions, column => {
                            if (isFunction(column.label)) {
                                if (column.onRecoveryPassword) {
                                    return column.label(info, onRecoveryPassword);
                                }
                                if (column.onDelete) {
                                    return column.label(info, onDelete);
                                }
                                return column.label(info);
                            }

                            if (column.linkTo) {
                                return (
                                    <Button
                                        tag={Link}
                                        to={`${column.linkTo}${primaryKey}`}
                                        bsSize="sm"
                                        key={uniqueId('mobileLinkTo')}
                                    >
                                        <FontAwesomeIcon icon={faEdit}/>
                                        &nbsp;
                                        { column.label }
                                    </Button>
                                );
                            }

                            if (onDelete) {
                                return (
                                    <Button
                                        onClick={() => onDelete({id: primaryKey, ...info})}
                                        bsStyle="danger"
                                        bsSize="sm"
                                        key={uniqueId('mobileDelete')}
                                    >
                                        <FontAwesomeIcon icon={faEraser}/>
                                    </Button>
                                );
                            }

                            return null;
                        })}
                    </ButtonGroup>
                </td>
            )}

        </tr>
    );
};

export default Item;
