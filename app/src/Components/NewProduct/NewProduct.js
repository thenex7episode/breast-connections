import React, { Component } from 'react';
import axios from 'axios'
import {Button, Input} from 'antd'
import {Link} from 'react-router-dom'

const CLOUDINARY_UPLOAD_PRESET = 'Breast Connections';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/thenex7episode/image/upload'


export default class NewProduct extends Component {
    constructor() {
    super();

        this.state = {
            product: '',
            description: '',
            image: '',
            user: ''
        }
    }

    componentDidMount() {
        axios.get('/api/check-session').then(r => {
            console.log('_u-s_e-r_d-a_t-a', r)
            if(r.data.username) {
                this.setState({user: r.data.username})
            }
        })
    }

    setProduct(val) {
        this.setState({product: val})
    }

    setDescription(val) {
        this.setState({description: val})
    }



    handleImageUpload = (file) => {
        axios.get('/api/upload').then(response => {
            console.log(response.data.signature)
            let formData = new FormData();
            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)
            formData.append("file", file[0])

            axios.post(CLOUDINARY_UPLOAD_URL, formData).then(response => {
                console.log('---------------r.data', response.data);
                this.setState({
                    image: response.data.secure_url
                })
                console.log(response.data)
            }).catch ( err => {
                console.log(err)
            })
        })
    }

    createProduct() {
        let newProduct = {
            "item_name":this.state.product,
            "description": this.state.description,
            "username": this.state.user,
            "imageurl": this.state.image

        }
        axios.post('/api/newproduct', newProduct).then(r => {
            this.props.history.push('/shop')
        })
    }
    render() {
        return (
            <div style={{margin: '5em'}}>
                        <Input type="file"  onChange={e => this.handleImageUpload(e.target.files)}/>
                        <Input placeholder='name' type="text"  onChange={e => this.setProduct(e.target.value)}/>
                        <Input placeholder='description' type="text"  onChange={e => this.setDescription(e.target.value)}/>
                    <Button onClick={() => this.createProduct()}>Sell</Button>
                    <Link to='/'><Button>Cancel</Button></Link>
            </div>
        );
    }
}
            
                  