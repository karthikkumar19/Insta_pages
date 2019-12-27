import React ,{Component} from 'react';
import Page from '../Components/Page/page';

class selectedpage extends Component {
    render(){
        let pages = this.props.pages.map(page => (
            <Page 
              pageName={page.name}
              followers={page.followers}
              Insta_id={page.instaId}
              Page_link={page.pageLink}
              Lang={page.language}
              edit={() => this.onEditHandler(page.instaId)} 
              />
        ));
        return(
            <div>
               {pages}
            </div>
        )
    }
}

export default selectedpage;