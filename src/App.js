import React, {Component} from 'react';
import './App.css';
import Pages from './Components/Pages/pages';
import AddpageForm from './Container/addpageform';
import Editpage from './Container/editpage';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';


class App extends Component{



  render(){
    return(
      <div>
        <h1>insta</h1>
        <Switch>
        <Route path="/add" component={() => <AddpageForm name={`Props through component`} />} />
        <Route path="/:id" component={Editpage} />
        <Route path="/" exact component={Pages} />
        <Redirect to="/" />
      </Switch>
]      </div>
    )
  }
}

export default withRouter( App);
