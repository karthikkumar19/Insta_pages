import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <h1 className={classes.DesktopOnly}>Instagram Pages</h1>
        <div className={classes.dropdown}>
  <button className={classes.dropbtn}>Filter</button>
  <div className={classes.dropdowncontent}>
  <button onClick={props.ascpage} >Low To High</button>
  <button onClick={props.dscpage} >High To Low</button>
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