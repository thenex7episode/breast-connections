import React, { Component } from 'react';
import axios from 'axios'
import {Avatar, Button, Icon, Input} from 'antd'
import './Profile.css'
import { image } from 'cloudinary';
const { TextArea } = Input

const CLOUDINARY_UPLOAD_PRESET = 'Breast Connections'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/thenex7episode/image/upload'


export default class Profile extends Component {
    constructor(props) {
        super()

        this.state = {
            user: '',
            first: '',
            last: '',
            image: '',
            message: null,
            isLoggedIn: false,
            posts: [],
            body: '',
            size: 'large',
            edit: false,
            uploadedFileCloudinaryUrl: ''
        }
    }

    componentDidMount() {
        const username = this.props.match.params.username
        console.log('-------username', username)
        axios.get(`/api/user/${username}`).then(r => {
            console.log('-----------------r',r)
             
                // console.log('profile username log', r.data[0].username)
                this.setState({isLoggedIn: true, user: r.data[0].username, first: r.data[0].first, last: r.data[0].last, image: r.data[0].imageurl, body: r.data[0].body})
            
        })
    }
    
    handleSize = e => {
        this.setState({ size: e.target.value})
    }

    handleChange(key, value) {
        this.setState({[key]: value})
    }


    profileChange(username) {
        axios.put(`/api/editprofile/${username}`, this.state).then(() => {
            this.setState({edit: false})
        })
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
                this.profileChange(this.state.user)
                console.log('-------------------uploadedCloudinary', image)
            }).catch ( err => {
                console.log(err)
            })
        })
    }

    render() {
        
        const {isLoggedIn, user, first, last, image, size, edit, body} = this.state
        console.log('user:', user)
        console.log('first:', first)
        console.log('last:', last)
        console.log('logged in:', isLoggedIn)
        console.log('edit:', edit)
        
        return (
            <div>
                <div>
                <div>

                {!edit  
                    ?<Button size={size}type= 'dashed' style={{float: 'right'}} onClick={() => this.setState({edit: true})}>Edit</Button>    
                    :<div>
                        <Button size={size}type= 'dashed' style={{float: 'right'}} onClick={() => this.profileChange(user)}>Complete</Button>    
                            <TextArea value={body} rows ={4} onChange={(e) => this.handleChange('body', e.target.value)}/>
                                <Input type='file' onChange={e => this.handleImageUpload(e.target.files)}/>
                    </div>
                }
                <div className = 'avatar'>
                <Avatar icon ='user' style = {{alignContent: 'center', height: '12em', width: '12em', borderRadius: '50%'}} src={image}/>
                </div>
                    <h1 className = 'name'>{first} {last}</h1>
                        <div className='bio'>
                            {body}
                            </div> 
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                            <a href="#" className="fa fa-facebook"></a>
                            <a href="#" className="fa fa-twitter"></a>
                </div>


                
                
            </div>
                
                
            </div>
        );
    }
}

