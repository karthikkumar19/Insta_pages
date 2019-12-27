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
    axios.get('/pages.json')
    .then(response => {
        const fetchedPages = [];
        for (let key in response.data){
            fetchedPages.push({
                ...response.data[key],
                id:key
            });}
        console.log(response.data);
        
        this.setState({loading:false,pages:fetchedPages})
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
          Lang={page.language} />
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