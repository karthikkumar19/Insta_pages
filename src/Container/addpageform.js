import React, { Component } from 'react';
import Button from '../Components/UI/Button/button';
import {connect} from 'react-redux';
import {  Redirect } from 'react-router-dom';
import classes from './addpageform.module.css';
import axios from '../axios-orders';
import Input from '../Components/UI/Input/input';
import * as actions from '../store/actions/index';
import Spinner from '../Components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import {updateObject, checkValidity} from '../shared/utility';


class AddPageForm extends Component {



    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Page Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            followers: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Followers'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            instaId: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Insta ID'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            pageLink: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Link'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            language: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Page Language'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        this.props.onAddPage(formData);
    }

    

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier],{
                value:event.target.value,
                valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
                touched:true
        });
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]:updatedFormElement
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    onProps = () => {
        console.log(this.props.histroy);
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
        let form = (
            <div>
            {purchasedRedirect}
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>SUBMIT</Button>
            </form>
            </div>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.PageData}>
                <h4>Enter your Page Data</h4>
                {form}
                
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        loading:state.page.loading,
        purchased:state.page.purchased
        // token: state.auth.token,
        // userId:state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onAddPage : (pageData) => dispatch(actions.addPage(pageData))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(AddPageForm,axios));