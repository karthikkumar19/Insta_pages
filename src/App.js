import React, {Component} from 'react';
import './App.css';
import Pages from './Components/Pages/pages';
import { connect } from 'react-redux';
import AddpageForm from './Container/addpageform';
import Editpage from './Container/editpage';
import Auth from './Container/Auth/Auth';
import Logout from './Container/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';


class App extends Component{

  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render(){

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={Pages} />
        <Redirect to="/" />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route path="/add" exact component={AddpageForm}  />
        <Route path="/:id"  component={Editpage} />
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
