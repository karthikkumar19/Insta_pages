import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <h1 className={classes.DesktopOnly}>Instagram Pages</h1>
        <div className={classes.dropdown}>
  <button className={classes.dropbtn}>Dropdown</button>
  <div className={classes.dropdowncontent}>
  <button >Link 1</button>
  <button >Link 2</button>
  <button >Link 3</button>
  </div>
</div>
       { props.isAuthenticated ? <NavigationItem link="/add">Add page</NavigationItem> : null }
        {
            !props.isAuthenticated ? <NavigationItem link="/auth">Admin</NavigationItem> 
            : <NavigationItem link="/logout">Logout</NavigationItem>
        }
    </ul>
);

export default navigationItems;