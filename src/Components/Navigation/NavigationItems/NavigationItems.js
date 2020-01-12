import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import {Dropdown,DropdownButton} from 'react-bootstrap';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <h1 className={classes.DesktopOnly}>Instagram Pages</h1>
        <DropdownButton id="dropdown-basic-button" title="Dropdown button">
  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
</DropdownButton>
       { props.isAuthenticated ? <NavigationItem link="/add">Add page</NavigationItem> : null }
        {
            !props.isAuthenticated ? <NavigationItem link="/auth">Admin</NavigationItem> 
            : <NavigationItem link="/logout">Logout</NavigationItem>
        }
    </ul>
);

export default navigationItems;