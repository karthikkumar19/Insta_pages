import React, {Component} from 'react';
import './App.css';
import Pages from './Components/Pages/pages';
import AddpageForm from './Container/addpageform';
import Editpage from './Container/editpage';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';


class App extends Component{



  render(){
    return(
      <div>
        <Layout>
        <Switch>
        <Route path="/" exact component={Pages} />
        <Route path="/add" exact component={AddpageForm} />} />
        <Redirect to="/" />
        <Route path="/:id"  component={Editpage} />
      </Switch>
      </Layout>
     </div>
    )
  }
}

export default withRouter( App);
