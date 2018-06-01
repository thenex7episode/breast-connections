import React, { Component } from 'react';
import axios from 'axios'

export default class editProfile extends Component {
    constructor() {
        super()

        this.state = {
            product: '',
            description: '',
            id: ''
        }
    }

    componentDidMount() {
        const productID = this.props.match.params.id
        console.log('productID in editProduct:', productID)
        axios.get(`/api/product/${productID}`).then(response => {
            console.log('-------response in:', response)
            this.setState({id: response.data[0].product_id, product: response.data[0].item_name, description: response.data[0].description})
        })
    }

    setProduct(value) {
        console.log('setProduct',value)
        this.setState({product: value})
    }
    setDescription(value) {
        this.setState({description: value})
    }

    change(id) {
        axios.put(`/api/editproduct/${id}`, this.state).then(() => {
            this.props.history.push('/shop')
        })
    }
    render() {
        const {id} = this.state
        return (
            <div style={{marginTop: '5em'}}>
                <input value={this.state.product} type="text" onChange={(e) => this.setProduct(e.target.value)}/>
                <input value={this.state.description}type="text" onChange={(e) => this.setDescription(e.target.value)}/>
                <button onClick={() => this.change(id)}>Update</button>
            </div>
        );
    }
}