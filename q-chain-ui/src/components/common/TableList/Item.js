/* eslint-disable react/prop-types */
import React from 'react';
import {
    Row,
    Col,
    Button,
    ButtonGroup
} from 'reactstrap';
import {
    set,
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
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
    faEdit,
    faEraser,
    faEye,
    faAngleDoubleDown,
    faCheckCircle,
    faTimesCircle,
    faCheckSquare,
    faCalendarCheck,
    faClock,
    faSync
} from '@fortawesome/free-solid-svg-icons';

import ModalWithDynamicButtons from '@components/common/ModalWithDynamicButtons';
import Detail from './Detail';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        boxShadow: 'none'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)'
    },
    title: {
        fontSize: 14,
        boxShadow: 0
    },
    pos: {
        marginBottom: 12,
        boxShadow: 0
    }
});

const getIcon = info => {
    if (info.shift_status === 'Attended') {
        return faCalendarCheck;
    }
    if (info.shift_status === 'onHold') {
        return faClock;
    }
    return faSync;
};

const getStatus = info => {
    if (info.shift_status === 'Attended') {
        return 'Atendido';
    }
    if (info.shift_status === 'onHold') {
        return 'En espera';
    }
    return 'En progreso';
};

const Item = ({
    info,
    onDelete,
    primaryKey,
    onRecoveryPassword,
    columns,
    handlePopup,
    closePopup,
    popup,
    updateShift
}) => {
    const noActions = filter(columns, c => c.draw && !c.actions);
    const actions = filter(columns, c => c.draw && c.actions);
    const classes = useStyles();

    const handleUpdateShift = (value, status) => {
        set(value, 'shift_status', status);
        updateShift(value);
    };

    return (
        <tr className="text-user-table" onClick={() => handlePopup()}>
            {popup === info && (
                <ModalWithDynamicButtons
                    closed
                    title={(
                        <>
                            <Row>
                                <Col className="text-center mx-auto">
                                    {get(info, 'company_name')}
                                </Col>
                            </Row>
                            <Row>
                                <Col className="icon-status">
                                    <div className="icon-status">
                                        <FontAwesomeIcon
                                            className="text-success"
                                            icon={getIcon(info)}
                                            size="1x"
                                        />
                                    </div>
                                </Col>
                                <p className="icon-status-text">
                                    {getStatus(info)}
                                </p>
                            </Row>
                        </>
                    )}
                    message={(
                        <Card className={classes.root}>
                            <CardContent>
                                <Typography gutterBottom>
                                    Empleado:
                                    {' '}
                                    {get(info, 'employee_name')}
                                </Typography>
                                <hr style={{color: '#000'}}/>
                                <Typography>
                                    Fecha y hora:
                                    {'    '}
                                    {get(info, 'shift_date')}
                                </Typography>
                                <hr/>
                                <Typography>
                                    Direccion:
                                    {'    '}
                                    {get(info, 'shift_address')}
                                </Typography>
                            </CardContent>
                            <CardActions className="float-right">
                                {getStatus(info) === 'Atendido' && (
                                    <Button
                                        size="small"
                                        className="react-btn"
                                        onClick={() => closePopup(false)}
                                        onTouchEnd={() => closePopup(false)}
                                    >
                                        Calificar
                                    </Button>
                                )}
                                {getStatus(info) === 'En espera' && (
                                    <Button
                                        size="small"
                                        className="react-btn"
                                        onClick={() => handleUpdateShift(info, 'inProgress')}
                                        onTouchEnd={() => handleUpdateShift(info, 'inProgress')}
                                    >
                                        Llegué
                                    </Button>
                                )}
                                {getStatus(info) === 'En progreso' && (
                                    <Button
                                        size="small"
                                        className="react-btn"
                                        onClick={() => handleUpdateShift(info, 'Attended')}
                                        onTouchEnd={() => handleUpdateShift(info, 'Attended')}
                                    >
                                        Atendido
                                    </Button>
                                )}
                                <Button
                                    size="small"
                                    className="react-btn"
                                    onClick={() => closePopup(false)}
                                    onTouchEnd={() => closePopup(false)}
                                >
                                    Cancelar
                                </Button>
                            </CardActions>
                        </Card>
                    )}
                    buttons={
                        [
                            {
                                onClick: () => closePopup(false),
                                onTouchEnd: () => closePopup(false),
                                className: 'd-none'
                            }

                        ]
                    }
                    buttonToggleIndex={0}
                />
            )}
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
