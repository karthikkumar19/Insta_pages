import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <h1 className={classes.DesktopOnly}>Instagram Pages</h1>
        <NavigationItem link="/add" exact> Add Page</NavigationItem>
       { props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null }
        {
            !props.isAuthenticated ? <NavigationItem link="/auth">Authentication</NavigationItem> 
            : <NavigationItem link="/logout">Logout</NavigationItem>
        }
    </ul>
);

export default navigationItems;