import React, {Component} from 'react';
import Page from './Page/page';
import Spinner from '../UI/Spinner/Spinner';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import classes from './pages.module.css';



class Pages extends Component {

    state={
        searchName:'',
        pageId:''
    }

    sortAscending = () => {
       this.props.onAscPage(this.props.pages);   
      }

    sortDescending = () => {
        this.props.onDscPage(this.props.pages);
    }

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
  }

  updateInput(event){
    let name = event.target.value;
    let searchName = this.state.searchName;
    searchName = name;
    this.setState({searchName:searchName});
    }

    updatesecInput(event){
        let name = event.target.value;
        let pageId = this.state.pageId;
        pageId = name;
        this.setState({pageId:pageId});
        }

    onSearchData = (event) => {
        event.preventDefault();
            console.log(this.state.searchName);
this.props.onSearchpage(this.state.searchName,this.state.pageId);
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
          isAuthenticated={this.props.isAuthenticated}
          edit={() => this.onEditHandler(page.id)} 
          delete={() => this.onDeleteHandler(page.id)}
          />
    ));
}
        return(
            <div >
                <div className={classes.form} >
                    <form onSubmit={(event) => this.onSearchData(event)} >
                    <input type="text" placeholder="enter the page name to search" onChange={(event) => this.updateInput(event)}></input>
                    <input type="text" placeholder="enter the page id to search" onChange={(event) => this.updatesecInput(event)}></input>
                <button >Search</button>
                    </form>    
                    
                </div>
                

                {pages}          
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        pages:state.page.pages,
        loading:state.page.loading,
        fetched:state.page.fetched,
        isAuthenticated: state.auth.token !== null
         // token:state.auth.token,
        // userId:state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchPages : () => dispatch(actions.fetchPage()),
        onAddPageInit : () => dispatch(actions.addPageInit()),
        onAscPage : (page) => dispatch(actions.ascPage(page)),
        onDscPage : (page) => dispatch(actions.dscPage(page)),
        onSearchpage : (pgname,pageid) => dispatch(actions.searchPage(pgname,pageid))
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(Pages, axios)); 