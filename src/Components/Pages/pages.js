import React, {Component} from 'react';
import Page from '../Page/page';
import Spinner from '../UI/Spinner/Spinner';
import axios from '../../axios-orders';

class Pages extends Component {

state={
    pages:[],
    loading:true
}

componentDidMount() {
    const name = "ntng";
    const queryParams = '?orderBy="instaId"&equalTo="'+ name +  '"';
    axios.get('/pages.json'+ queryParams )
    .then(response => {
        const fetchedPages = [];
        for (let key in response.data){
            fetchedPages.push({
                ...response.data[key],
                id:key
            });}
            const data = Object.values(response.data);
        
        this.setState({loading:false,pages:fetchedPages})
        console.log(response.data);

    })
    .catch(err => {
        this.setState({loading:false});
    });
 }

    render(){
let pages = <Spinner/>
if(!this.state.loading){
    pages = this.state.pages.map(page => (
        <Page 
          pageName={page.name}
          followers={page.followers}
          Insta_id={page.instaId}
          Page_link={page.pageLink}
          Lang={page.language} 
        
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