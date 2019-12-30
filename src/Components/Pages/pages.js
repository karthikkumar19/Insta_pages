import React, {Component} from 'react';
import Page from './Page/page';
import Spinner from '../UI/Spinner/Spinner';
import axios from '../../axios-orders';
import firebase from '../../firebase';


class Pages extends Component {

state={
    pages:[],
    name:"",
    loading:true,
    changed:true
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
    const wordRef = firebase.database().ref('pages');
    wordRef.on('value', (snapshot) => {
      let words = snapshot.val();
      let newState =[];
      for (let name in words){
        newState.push({
          id:name,
          name:words[name].name,
          followers:words[name].followers,
          instaId:words[name].instaId,
          pageLink:words[name].pageLink,
          language:words[name].language
        });
      }
      console.log(newState[0]);
      this.setState({loading:false,pages:newState,changed:false})
    })
  }
    render(){
let pages = <Spinner/>
if(!this.state.loading){
    pages = this.state.pages.map(page => (
        <Page 
          pageName={page.name}
          key={page.id}
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

export default Pages;