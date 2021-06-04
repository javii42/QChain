/* eslint-disable react/prop-types */
import React from 'react';
import {
    PopoverHeader,
    PopoverBody,
    UncontrolledPopover,
    Row,
    Col
} from 'reactstrap';
import {
    get, map, uniqueId, isFunction
} from 'lodash';

const renderPopover = (info, columns, id) => (
    <UncontrolledPopover
        target={id}
        placement="top"
        trigger="hover"
        show
        className="popover-info"
    >
        <PopoverHeader className="text-white">Detalles</PopoverHeader>
        <PopoverBody>
            {map(columns, column => !column.noInfo && (
                <Row key={uniqueId('popover-body')}>
                    <Col sm="12" md="5" className="m-0 p-0">
                        {column.text}
                        :
                    </Col>
                    <Col className="m-0 p-0">
                        {isFunction(column.label) ? column.label(info) : get(info, column.label)}
                    </Col>
                </Row>
            ))}
        </PopoverBody>
    </UncontrolledPopover>
);

const Details = ({
    info, columns, children
}) => {
    const id = `b${uniqueId('popover-details')}`;
    return (
        <span id={id} style={{cursor: 'pointer'}}>
            {children}
            {renderPopover(info, columns, id)}
        </span>
    );
};

Details.defaultProps = {
    info: null
};

export default Details;
