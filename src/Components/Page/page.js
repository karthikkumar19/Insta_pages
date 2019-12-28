import React ,{Component} from 'react';
import classes from './page.module.css';
import Button from '../UI/Button/button';

class page extends Component {

    
    render(){
        return (
            <div className={classes.Page}>
                <span>Page Name: <strong> {this.props.pageName} </strong> </span>
                    <br></br>
                   <span> Page Followers: <strong>{this.props.followers}</strong>  </span>
                   <br></br>
                   <span> Insta ID: <strong>{this.props.Insta_id}</strong>  </span>
                   <br></br>
                   <span> Page Link: <strong>{this.props.Page_link}</strong>  </span>
                   <br></br>
                   <span> Language: <strong>{this.props.Lang}</strong>  </span>
                   <br></br>
                   <Button btnType="Success" clicked={this.props.edit} >Edit</Button>
                   <Button btnType="Danger" clicked={this.props.delete} >DELETE</Button>
            </div>
        );
    }
};

export default page;