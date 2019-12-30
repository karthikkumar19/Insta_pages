import React ,{Component} from 'react';
import classes from './page.module.css';
import Button from '../../UI/Button/button';

class page extends Component {

    
    render(){
        return (
            <div className={classes.Page}>
                <span className={classes.pgName}>Page Name: <strong> {this.props.pageName} </strong> 
              
                </span>
                    <br></br>
                   <span className={classes.pgFollowers}>  <strong>{this.props.followers}</strong> 
                   <br/>
                   <h6>followers</h6>
                   </span>
                   <br></br>
                   <span> Insta ID: <strong>{this.props.Insta_id}</strong>  </span>
                   <br></br>
                   <span> Page Link: <strong>{this.props.Page_link}</strong>  </span>
                   <br></br>
                   <span> Language: <strong>{this.props.Lang}</strong>  </span>
                   <br></br>
                   <Button btnType="Success"  clicked={this.props.edit} >
                   <i className="fa fa-edit"></i>
                   </Button>
                   <Button btnType="Danger" clicked={this.props.delete} >
                   <i className="fa fa-trash"></i>
                   </Button>
            </div>
        );
    }
};

export default page;