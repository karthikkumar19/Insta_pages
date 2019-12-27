import React from 'react';
import classes from './page.module.css';

const page = ( props ) => {

    return (
        <div className={classes.Page}>
            <span>Page Name: <strong> {props.pageName} </strong> </span>
                <br></br>
               <span> Page Followers: <strong>{props.followers}</strong>  </span>
               <br></br>
               <span> Insta ID: <strong>{props.Insta_id}</strong>  </span>
               <br></br>
               <span> Page Link: <strong>{props.Page_link}</strong>  </span>
               <br></br>
               <span> Language: <strong>{props.Lang}</strong>  </span>

            {/* <p>Price: <strong>USD {Number.parseFloat( props.price ).toFixed( 2 )}</strong></p> */}
        </div>
    );
};

export default page;