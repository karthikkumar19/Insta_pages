import React, {Component} from 'react';
import './App.css';
import Pages from './Components/Pages/pages';
import { connect } from 'react-redux';
import Logout from './Container/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asynComponent';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';

const asyncAddpage = asyncComponent(() => {
  return import('./Container/addpageform');
});

const asyncEdit = asyncComponent(() => {
  return import('./Container/editpage');
});

const asyncAuth = asyncComponent(() => {
  return import('./Container/Auth/Auth');
});

class App extends Component{

  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render(){

    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={Pages} />
        <Redirect to="/" />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/add" exact component={asyncAddpage}  />
        <Route path="/:id"  component={asyncEdit} />
        <Route path="/" exact component={Pages} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return(
      <div>
        <Layout>
        {routes}
      </Layout>
     </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
