import React, { Component } from 'react';
import Button from '../Components/UI/Button/button';
import classes from './addpageform.module.css';
import axios from '../axios-orders';
import Input from '../Components/UI/Input/input';
import Spinner from '../Components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import {updateObject, checkValidity} from '../shared/utility';
import {withRouter} from 'react-router-dom';


class Editpage extends Component {

componentDidMount(){
    console.log(this.props.match.params.id);
    let id = this.props.match.params.id;
    axios.get('/pages/' +id+ '.json' )
            .then(response => {
                const name = response.data.name;
                const followers = response.data.followers;
                const insta_id = response.data.instaId;
                const link = response.data.pageLink;
                const pgLang = response.data.language;
    var someProperty = {...this.state.orderForm}
    someProperty.name.value = name;
    someProperty.followers.value = followers;
    someProperty.instaId.value = insta_id;
    someProperty.pageLink.value = link;
    someProperty.language.value = pgLang;
    this.setState({someProperty,id:this.props.match.params.id})
                    console.log(response.data);        
            })
            .catch(err => {
               console.log(err)
            });
}

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
        loading:false,
        id:''
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        console.log(this.state.id)
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        this.setState({loading:true});
        axios.put('/pages/'+ this.state.id + '.json',formData)
    .then(res => {
        console.log(res);
        this.setState({changed:true});
          this.props.history.push('/');
    }).catch(err => {
        console.log(err);
    })
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
                <Button btnType="Success" >SUBMIT</Button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Page Data</h4>
                {form}
                <button onClick={this.onProps}>Click</button>
                  />
            </div>
        );
    }
}


export default withRouter( withErrorHandler(Editpage,axios)) ;