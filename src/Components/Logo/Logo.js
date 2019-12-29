import React from 'react';
import {Link} from 'react-router-dom';
import instaLogo from '../../assets/images/insta.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
    <Link to="/">
    <img src={instaLogo} alt="InstaLogo" />

    </Link>
    </div>
);

export default logo;