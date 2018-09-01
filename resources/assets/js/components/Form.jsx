import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import axios from 'axios';
import {get} from 'lodash';

export default class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item_name: "",
            item_price: "",
            item_description: "",
            errorData: null
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.getFormData = this.getFormData.bind(this);
    }

    getFormData()
    {
        return {
            name: this.state.item_name,
            price: this.state.item_price,
            description: this.state.item_description
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        axios.post(`/item/create`, this.getFormData())
            .then(response => {
                this.setState({ errorData: null })
            })
            .catch(error => {
                if (error.response) {
                    this.setState({ errorData: error.response.data })
                    return
                }

                alert("Form submittance failed.");
            })

    }

    render() {
        return (
            <Fragment>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="input-item-name">
                            Item Name:
                        </label>
                        
                        <InputFormControl
                            id="input-item-name"
                            value={this.state.item_name}
                            type="text"
                            onChange={e => { this.setState({ item_name: e.target.value }) }}
                            placeholder="Item name"
                            isInvalid={get(this.state.errorData, 'errors.name', false)}
                            invalidFeedback={get(this.state.errorData, 'errors.name', "")}
                            />
                    </div>

                    <div className="form-group">
                        <label htmlFor="input-item-name">
                            Item Price:
                        </label>
                        
                        <InputFormControl
                            id="input-item-name"
                            value={this.state.item_price}
                            type="number"
                            onChange={e => { this.setState({ item_price: e.target.value }) }}
                            placeholder="Item Price"
                            isInvalid={get(this.state.errorData, 'errors.price', false)}
                            invalidFeedback={get(this.state.errorData, 'errors.price', "")}
                            />
                    </div>

                    <div className="form-group">
                        <label htmlFor="input-item-name">
                            Item Description:
                        </label>
                        
                        <TextAreaFormControl
                            id="input-item-name"
                            value={this.state.item_description}
                            type="number"
                            onChange={e => { this.setState({ item_description: e.target.value }) }}
                            placeholder="Item Description"
                            isInvalid={get(this.state.errorData, 'errors.description', false)}
                            invalidFeedback={get(this.state.errorData, 'errors.description', "")}
                            />
                    </div>
                    
                    <div className="text-right">
                        <button className="btn btn-primary">
                            Add Item +
                        </button>
                    </div>
                </form>
            </Fragment>
        );
    }
}

function InputFormControl({ isInvalid, invalidFeedback, ...props }) {

    let class_names = classNames({
        'is-invalid': isInvalid,
        'form-control': true,
        'form-control-sm': true,
        ...props.className
    });
    
    return (
        <Fragment>
            <input {...props} type="text" className={class_names}/>
            { isInvalid && <div className="invalid-feedback">
                <p>
                    { invalidFeedback }
                </p>
            </div> }
        </Fragment>
    )
}

function TextAreaFormControl({ isInvalid, invalidFeedback, ...props }) {

    let class_names = classNames({
        'is-invalid': isInvalid,
        'form-control': true,
        'form-control-sm': true,
        ...props.className
    });
    
    return (
        <Fragment>
            <textarea {...props} type="text" className={class_names}/>
            { isInvalid && <div className="invalid-feedback">
                <p>
                    { invalidFeedback }
                </p>
            </div> }
        </Fragment>
    )
}

if (document.getElementById('item-create-root')) {
    ReactDOM.render(<Form />, document.getElementById('item-create-root'));
}
