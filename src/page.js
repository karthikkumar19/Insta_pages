import React from 'react';
import classes from './page.module.css';

const page = ( props ) => {

    return (
        <div className={classes.Page}>
            <p style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
                }}>Page Name: {props.pageName}</p>
            {/* <p>Price: <strong>USD {Number.parseFloat( props.price ).toFixed( 2 )}</strong></p> */}
        </div>
    );
};

export default page;