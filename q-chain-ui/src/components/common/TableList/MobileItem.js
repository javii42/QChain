/* eslint-disable react/prop-types */
import React from 'react';
import {
    Button,
    Row,
    Col,
    ButtonGroup
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faEdit,
    faEraser,
    faEye
} from '@fortawesome/free-solid-svg-icons';
import get from 'lodash/get';
import includes from 'lodash/includes';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import join from 'lodash/join';
import map from 'lodash/map';
import filter from 'lodash/filter';
import uniqueId from 'lodash/uniqueId';

import Detail from './Detail';

const Item = ({
    info,
    onDelete,
    primaryKey,
    columns,
    headers,
    onRecoveryPassword
}) => (
    <div className="border border-dark p-2 m-2">
        <Row>
            {map(filter(columns, c => !c.actions && c.draw), (column, i) => (
                <Col
                    sm={6}
                    key={uniqueId('mobileItem')}
                >
                    {column.detail && (
                        <>
                            <h4 className="bg-dark text-white">
                                { headers[i].label }
                            </h4>
                            <Detail
                                info={info}
                                columns={columns}
                            >
                                <div>
                                    <FontAwesomeIcon icon={faEye}/>
                                    {isFunction(column.label) && column.label(info)}
                                    {!isFunction(column.label) && !isArray(column.label) && get(info, column.label) }
                                    {
                                        !isFunction(column.label) && isArray(column.label)
                                        && join(map(column.label, e => get(info, e)), ', ')
                                    }
                                </div>
                            </Detail>
                        </>
                    )}
                    {!column.detail && (
                        <>
                            <h4 className="bg-dark text-white">
                                { headers[i].label }
                            </h4>
                            {isFunction(column.label) && column.onDelete && column.label(info, onDelete)}
                            {isFunction(column.label) && !column.onDelete && !column.recoveryPassword && column.label(info)}
                            {!isFunction(column.label) && !isArray(column.label) && get(info, column.label) }
                            {
                                !isFunction(column.label) && isArray(column.label)
                                && join(map(column.label, e => get(info, e)), ', ')
                            }
                        </>
                    )}
                </Col>
            ))}
        </Row>
        <Row>
            <Col sm="12">
                <h4 className="bg-dark text-white">
                    &nbsp;&nbsp;&nbsp; Acciones
                </h4>
                <ButtonGroup>
                    {!includes(info.roles, 'Coordinador Nacional') && map(filter(columns, c => c.draw && c.actions), column => {
                        if (isFunction(column.label)) {
                            if (column.onRecoveryPassword) {
                                return column.label(info, onRecoveryPassword);
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
                                    { column.label }
                                </Button>
                            );
                        }

                        if (onDelete) {
                            return (
                                <Button
                                    onTouchStart={() => onDelete({id: primaryKey, ...info})}
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
            </Col>
        </Row>
    </div>
);

export default Item;
