import React from 'react';
import PropTypes from 'prop-types';
import {
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faBook
} from '@fortawesome/free-solid-svg-icons';

const NavItems = ({
    redirect
}) => (
    <Nav className="mr-auto" navbar>
        <NavItem>
            <NavLink
                onClick={() => redirect('/cuestionario')}
                onTouchEnd={() => redirect('/cuestionario')}
            >
                <FontAwesomeIcon icon={faBook}/>
                    &nbsp;Cuestionario
            </NavLink>
        </NavItem>
    </Nav>
);

NavItems.propTypes = {
    redirect: PropTypes.func.isRequired
};

export default NavItems;
