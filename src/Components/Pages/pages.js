import React, {Component} from 'react';
import Page from '../Page/page';
import Spinner from '../UI/Spinner/Spinner';
import axios from '../../axios-orders';
import SelectedPage from '../selectedpage';

class Pages extends Component {

state={
    pages:[
    ],
    selectedPage:[
        {
            followers:'99',
            instaId:'ttt',
            language:'tam',
            name:"init",
            pageLink:"ini"
        }
    ],
    loading:true,
    changed:true
}

onDeleteHandler = () =>{
    // const queryParams = '?orderBy="instaId"&equalTo="'+ id +  '"';
    let id ="-Lx5TtXvbg6iAauJcKNy";
    axios.get('/pages.json' )
    .then(response => {  
        console.log(response.data[0]);
                // this.componentDidMount();
    })
    .catch(err => {
        console.log(err);
    });
}

onEditHandler = (name) =>{

    // axios.put('/pages/-Lx7WiN-lFVzvhqz2Rhw.json',{
    //     followers:"success",
    //     instaId:"succ",
    //     language:'woking',
    //     name:"test_sucess",
    //     pageLink:"succc"
    // })
    // .then(res => {
    //     console.log(res);
    //     this.setState({changed:true});
    //     this.componentDidMount();


    // }).catch(err => {
    //     console.log(err)
    // })
    const queryParams = '?orderBy="instaId"&equalTo="'+ name +  '"';
    axios.get('/pages.json'+ queryParams )
    .then(response => {  
        // const selectedPages = [];
        // for (let key in response.data){
        //     selectedPages.push({
        //         ...response.data[key],
        //         id:key
        //     });}   
        console.log(response);
        // this.setState({selectedPage:selectedPages});
        // console.log(this.state.selectedPage);
    })
    .catch(err => {
        console.log(err);
    });
    console.log("working");
   
}




componentDidMount() {
        axios.get('/pages.json' )
        .then(response => {
            const fetchedPages = [];
            for (let key in response.data){
                fetchedPages.push({
                    ...response.data[key],
                    id:key
                });
            }   
                console.log(response);
                console.log(this.state.selectedPage);
            this.setState({loading:false,pages:fetchedPages,changed:false})
    
        })
        .catch(err => {
           console.log(err)
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
          edit={() => this.onEditHandler(page.instaId)} 
          delete={() => this.onDeleteHandler()}
          />
    ));
}
    // let spages = null;
    // spages = this.state.selectedPage.map(page => (
    //     <Page 
    //       pageName={page.name}
    //       followers={page.followers}
    //       Insta_id={page.instaId}
    //       Page_link={page.pageLink}
    //       Lang={page.language}
    //       edit={() => this.onEditHandler(page.instaId)} 
    //       />
    // ));

 

        return(
            <div>
                {pages}
                {/* {spages} */}
            </div>
        )
    }
}

export default Pages;