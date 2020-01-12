import React, { Component } from 'react';
import {connect} from 'react-redux';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';
import * as actions from '../../store/actions/index';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    render () {
        return (
            <Aux>
                <Toolbar
                isAuth={this.props.isAuthenticated}
                 drawerToggleClicked={this.sideDrawerToggleHandler} ascpage={() => this.props.onAscPage(this.props.pages)}
                 dscpage={() => this.props.onDscPage(this.props.pages)} />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.token !== null,
        pages: state.page.pages
    };
};
const mapDispatchToProps = dispatch => {
    return{
        onAscPage : (page) => dispatch(actions.ascPage(page)),
        onDscPage : (page) => dispatch(actions.dscPage(page)),
        onSearchpage : (pgname) => dispatch(actions.searchPage(pgname))
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Layout);