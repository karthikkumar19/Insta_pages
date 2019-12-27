import React from 'react';
import classes from './page.module.css';
import Button from '../UI/Button/button';

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
               <br></br>
               <Button btnType="Success">Edit</Button>
        </div>
    );
};

export default page;