import React, { Component } from 'react';
import Button from '../Components/UI/Button/button';
import classes from './addpageform.module.css';
// import axios from '../../../axios-orders';
import Input from '../Components/UI/Input/input';
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
        formIsValid: false
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        // const formData = {};
        // for (let formElementIdentifier in this.state.orderForm) {
        //     formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        // }
        // const order = {
        //     ingredients: this.props.ings,
        //     price: this.props.price,
        //     orderData: formData,
        //     userId:this.props.userId
        // }
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

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
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
        );
        // if ( this.props.loading ) {
        //     form = <Spinner />;
        // }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Page Data</h4>
                {form}
            </div>
        );
    }
}


export default AddPageForm;