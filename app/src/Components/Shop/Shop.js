import React, { Component } from 'react';
import axios from 'axios'
import Products from '../Products/Products'
import {Button} from 'antd'
import {Link} from 'react-router-dom'

export default class Shop extends Component {
    constructor() {
        super()

        this.state = {
            products: [],
            loggedInUser:'',
            id: ''
        }
    }


    componentDidMount() {
     this.getProducts() 
     axios.get('/api/check-session').then(r => {
        console.log('_u-s_e-r_d-a_t-a', r)
        if(r.data.username) {
            this.setState({loggedInUser: r.data.username})
        }
    })  
    }
    
    getProducts() {
        axios.get('/api/products').then(res => {
            console.log('------res.data in shop:', res)
            this.setState({products: res.data})
        })
    }

    delete(id) {
        axios.delete(`/api/delete/${id}`).then( () => {
            this.getProducts()
        })
    }
    render() {
        const{id} = this.state
        console.log('products in render in shop:', this.state.products)
        let newProducts = this.state.products.map(e => {
            return (
                <div>
            <Products name={e.item_name} description={e.description} donater={e.username} image={e.imageurl}/>
            { e.username === this.state.loggedInUser 
                ? <div>
                    <Button onClick={() => this.delete(e.product_id)}>Delete {e.item_name}</Button>
                    <Link to={`/edit/${e.product_id}`}><Button>Edit {e.item_name}</Button></Link>
                    </div>
                : ''}
                </div>
            )        
        })

        return (
            <div style={{marginTop: '5em'}}>
            <h1 style={{textAlign: 'center', fontSize: '40pt'}}>Donation Shop</h1>
            {newProducts}
            </div>
        );
    }
}