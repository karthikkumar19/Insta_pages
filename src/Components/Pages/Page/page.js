import React ,{Component} from 'react';
import classes from './page.module.css';
import Button from '../../UI/Button/button';

class page extends Component {

    
    render(){
let ui= null

    if(this.props.isAuthenticated){
            ui = classes.pgFollowers
    }
    else {
        ui = classes.ui
    }
    


        return (
            <div className={classes.Page}>
                <span className={classes.pgName}>Page Name: <strong> {this.props.pageName} </strong> 
                </span>
                    <br></br>
                    <span className={classes.mobileView}>followers: <strong> {this.props.followers} </strong> 
                </span>
                <br />
                   <span className={ui}>  <strong>{this.props.followers}</strong> 
                   <br/>
                   <h6>followers</h6>
                   </span>
                   <br></br>
                   <span> Insta ID   : <strong>{this.props.Insta_id}</strong>  </span>
                   <br></br>
                   <span> Page Link: <a href={this.props.Page_link} target="blank"><strong>{this.props.Page_link}</strong> </a> </span>
                   <br></br>
                   <span> Language: <strong>{this.props.Lang}</strong>  </span>
                   <br></br>
                   {
                       this.props.isAuthenticated ?  <Button btnType="Success"  clicked={this.props.edit} >
                       <i className="fa fa-edit"></i>
                       </Button> : null
                   }
                  {
                      this.props.isAuthenticated ? <Button btnType="Danger" clicked={this.props.delete} >
                      <i className="fa fa-trash"></i>
                      </Button> : null
                  }
                   
            </div>
        );
    }
};

export default page;