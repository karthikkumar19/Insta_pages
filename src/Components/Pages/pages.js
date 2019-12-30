import React, {Component} from 'react';
import Page from './Page/page';
import Spinner from '../UI/Spinner/Spinner';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
// import firebase from '../../firebase';


class Pages extends Component {



onDeleteHandler = (id) =>{

    axios.delete('./pages/'+id+'.json')
    .then(response => {  
        console.log(response);
                this.componentDidMount();
    })
    .catch(err => {
        console.log(err);
    });
}
onEditHandler = (name) =>{
    this.props.history.push('/' + name);   
}
componentDidMount(){
    this.props.onFetchPages();
    // this.props.onAddPageInit();
        
        
  }
    render(){
let pages = <Spinner/>
if(!this.props.loading){
    pages = this.props.pages.map((page,index) => (
        <Page 
          pageName={page.name}
          key={index}
          followers={page.followers}
          Insta_id={page.instaId}
          Page_link={page.pageLink}
          Lang={page.language}
          edit={() => this.onEditHandler(page.id)} 
          delete={() => this.onDeleteHandler(page.id)}
          />
    ));
}
        return(
            <div>
                {pages}          
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        pages:state.page.pages,
        loading:state.page.loading,
        // token:state.auth.token,
        // userId:state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchPages : () => dispatch(actions.fetchPage()),
        onAddPageInit : () => dispatch(actions.addPageInit())
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(Pages, axios)); 