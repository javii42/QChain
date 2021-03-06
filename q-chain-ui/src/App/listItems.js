/* global localStorage */
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import ApartmentIcon from '@material-ui/icons/Apartment';
import BusinessIcon from '@material-ui/icons/Business';
import DomainDisabledIcon from '@material-ui/icons/DomainDisabled';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {Link} from 'react-router-dom';

import {get} from 'lodash';

const getRedirection = () => {
    const user = localStorage.getItem('user');
    if (user) {
        return `/myShifts/${get(JSON.parse(user), '_id')}`;
    }
    return '/';
};

const getAdminRedirection = status => {
    const user = localStorage.getItem('user');
    if (user && status === 'Pending') {
        return `/myShiftsPending/${get(JSON.parse(user), '_id')}`;
    }
    if (user) {
        return `/myShiftsAdmin/${get(JSON.parse(user), '_id')}`;
    }
    return '/';
};

export const mainListItems = (
    <div>
        <ListItem
            button
            component={Link}
            to={getRedirection()}
        >
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Mis turnos"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ShoppingCartIcon/>
            </ListItemIcon>
            <ListItemText primary="Ranking"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <PeopleIcon/>
            </ListItemIcon>
            <ListItemText primary="Calificaciones"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <BarChartIcon/>
            </ListItemIcon>
            <ListItemText primary="Reportes"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <LayersIcon/>
            </ListItemIcon>
            <ListItemText primary="Integraciones"/>
        </ListItem>
    </div>
);

export const mainListItemsAdmin = (
    <div>
        <ListItem
            button
            component={Link}
            to="/"
        >
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Dashboard"/>
        </ListItem>
        <ListItem
            button
            component={Link}
            to="/company"
        >
            <ListItemIcon>
                <ApartmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Registrar compa????a"/>
        </ListItem>
        <ListItem
            button
            component={Link}
            to="/modifyCompany"
        >
            <ListItemIcon>
                <BusinessIcon/>
            </ListItemIcon>
            <ListItemText primary="Modificar compa????a"/>
        </ListItem>
        <ListItem
            button
            component={Link}
            to="/deleteCompany"
        >
            <ListItemIcon>
                <DomainDisabledIcon/>
            </ListItemIcon>
            <ListItemText primary="Eliminar compa????a"/>
        </ListItem>
        <ListItem
            button
            component={Link}
            to="/shift"
        >
            <ListItemIcon>
                <DomainDisabledIcon/>
            </ListItemIcon>
            <ListItemText primary="Solicitar turno"/>
        </ListItem>
        <ListItem
            button
            component={Link}
            to={getAdminRedirection()}
        >
            <ListItemIcon>
                <DomainDisabledIcon/>
            </ListItemIcon>
            <ListItemText primary="Visualizar turnos"/>
        </ListItem>
        <ListItem
            button
            component={Link}
            to={getAdminRedirection('Pending')}
        >
            <ListItemIcon>
                <DomainDisabledIcon/>
            </ListItemIcon>
            <ListItemText primary="Turnos pendientes de persistencia"/>
        </ListItem>
        <ListItem
            button
            component={Link}
            to="/myAgenda"
        >
            <ListItemIcon>
                <DomainDisabledIcon/>
            </ListItemIcon>
            <ListItemText primary="Mi agenda"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <BarChartIcon/>
            </ListItemIcon>
            <ListItemText primary="Reportes"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <LayersIcon/>
            </ListItemIcon>
            <ListItemText primary="Integraciones"/>
        </ListItem>
    </div>
);

export const mainListItemsAdminEmployee = (
    <div>
        <ListItem
            button
            component={Link}
            to="/"
        >
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Dashboard"/>
        </ListItem>
        <ListItem
            button
            component={Link}
            to="/employee"
        >
            <ListItemIcon>
                <ApartmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Registrar empleado"/>
        </ListItem>
        <ListItem
            button
            component={Link}
            to="/modifyEmployee"
        >
            <ListItemIcon>
                <BusinessIcon/>
            </ListItemIcon>
            <ListItemText primary="Modificar empleado"/>
        </ListItem>
        <ListItem
            button
            component={Link}
            to="/deleteEmployee"
        >
            <ListItemIcon>
                <DomainDisabledIcon/>
            </ListItemIcon>
            <ListItemText primary="Eliminar empleado"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <BarChartIcon/>
            </ListItemIcon>
            <ListItemText primary="Reportes"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <LayersIcon/>
            </ListItemIcon>
            <ListItemText primary="Integraciones"/>
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Reportes guardados</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Mes actual"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="??ltimo cuatrimestre"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="??ltimo a??o"/>
        </ListItem>
    </div>
);
