import React, {Component} from 'react';
import Page from '../Page/page';

class Pages extends Component {

state={
    pages:[
        {
            name:'vadivelu',
            followers:'30k',
            Insta_id:'xxx',
            Page_link:'xxx',
            lang:'tamil'
        },
        {
            name:'kaipulla',
            followers:'20k',
            Insta_id:'yyy',
            Page_link:'xxx',
            lang:'tamil'
        },
        {
            name:'candrolly',
            followers:'60k',
            Insta_id:'zzz',
            Page_link:'zzz',
            lang:'tamil'
        },
    ]
}

    render(){
let pages = this.state.pages.map(page => (
    <Page 
      pageName={page.name}
      followers={page.followers}
      Insta_id={page.Insta_id}
      Page_link={page.Page_link}
      Lang={page.lang} />
));

        return(
            <div>
                {pages}
            </div>
        )
    }
}

export default Pages;