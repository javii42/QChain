import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {Link} from 'react-router-dom';

export const mainListItems = (
    <div>
        <ListItem button>
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
                <PeopleIcon/>
            </ListItemIcon>
            <ListItemText primary="Registrar compañía"/>
        </ListItem>
        <ListItem
            button
            component={Link}
            to="/modifyCompany"
        >
            <ListItemIcon>
                <PeopleIcon/>
            </ListItemIcon>
            <ListItemText primary="Modificar compañía"/>
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
            <ListItemText primary="Último cuatrimestre"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Último año"/>
        </ListItem>
    </div>
);
