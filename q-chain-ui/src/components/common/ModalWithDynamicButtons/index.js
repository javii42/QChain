import React from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from 'reactstrap';

import map from 'lodash/map';
import uniqueId from 'lodash/uniqueId';

/**
 * @param {Object} Props
 * @param {String?} Props.message
 * @param {String?} Props.title
 * @param {Array} Props.buttons
 * @param {Number} Props.buttonToggleIndex
 * @param {React.ReactElement?} Props.children
 * @param {Boolean?} Props.large
 */
const ModalWithDynamicButtons = ({
    closed,
    message,
    title,
    buttons,
    buttonToggleIndex,
    specificFunction,
    children,
    large
}) => {
    let toggleFunction = buttons[buttonToggleIndex].onClick;

    if (specificFunction) {
        toggleFunction = specificFunction;
    }

    return (
        <Modal
            isOpen
            centered
            toggle={closed ? false : toggleFunction}
            size={large ? 'lg' : null}
        >
            {title && (
                <ModalHeader toggle={closed ? false : toggleFunction}>
                    {title}
                </ModalHeader>
            ) }
            <ModalBody >
                {message}
                {children}
            </ModalBody>
            <ModalFooter>
                {buttons && map(buttons, button => (
                    <Button
                        key={uniqueId(`btn-${button}`)}
                        {...button}
                    >
                        {button.label}
                    </Button>
                ))}
            </ModalFooter>
        </Modal>
    );
};

ModalWithDynamicButtons.propTypes = ({
    buttons: PropTypes.arrayOf(PropTypes.shape({
        onClick: PropTypes.func.isRequired,
        onTouchEnd: PropTypes.func.isRequired
    })).isRequired,
    buttonToggleIndex: PropTypes.number.isRequired,
    message: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({})
    ]),
    title: PropTypes.string.isRequired,
    children: PropTypes.element,
    large: PropTypes.bool,
    specificFunction: PropTypes.func,
    closed: PropTypes.bool
});

ModalWithDynamicButtons.defaultProps = {
    message: null,
    children: null,
    large: false,
    closed: false,
    specificFunction: null
};

export default ModalWithDynamicButtons;
