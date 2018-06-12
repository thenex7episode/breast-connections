import React, { Component } from 'react';
import axios from 'axios'
import {Avatar, Button, Icon, Input, Popconfirm, message, Tabs} from 'antd'
import './Profile.css'
import Post from '../Post/Post'
import {Link} from 'react-router-dom'
import { image } from 'cloudinary';
import Products from '../Products/Products'
const { TextArea } = Input
const TabPane = Tabs.TabPane


const CLOUDINARY_UPLOAD_PRESET = 'Breast Connections'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/thenex7episode/image/upload'


export default class Profile extends Component {
    constructor(props) {
        super()

        this.state = {
            user: '',
            loggedInUser: '',
            userID: '',
            admin: false,
            first: '',
            last: '',
            image: '',
            message: null,
            isLoggedIn: false,
            posts: [],
            body: '',
            size: 'large',
            edit: false,
            uploadedFileCloudinaryUrl: '',
            products: [],
        }

        this.deletePost= this.deletePost.bind(this)
    }

    componentDidMount() {
        const username = this.props.match.params.username
        console.log('-------username', username)
        axios.get(`/api/user/${username}`).then(r => {
            console.log('-----------------r.data:',r.data[0].username)
            this.setState({isLoggedIn: true, user: r.data[0].username, first: r.data[0].first, last: r.data[0].last, image: r.data[0].imageurl, body: r.data[0].body, admin: r.data[0].admin, userID: r.data[0].user_id})
            axios.get(`/api/userposts/${this.state.userID}`).then(data => {
                console.log('data:', data)
                this.setState({posts: data.data})
                console.log('------------------data.data.data:',data.data)
            })
            axios.get(`/api/seller/${username}`).then(r => {
                console.log('----------r in profile', r.data)
                this.setState({products: r.data})
            })
        })

        axios.get('/api/check-session').then(response => {
            console.log('--------------response', response.data.username) 
            this.setState({loggedInUser: response.data.username})
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
                // this.profileChange(this.state.user)
                console.log('-------------------uploadedCloudinary', image)
            }).catch ( err => {
                console.log(err)
            })
        })
    }

    deletePost(id){
        axios.delete(`/api/deletepost/${id}`).then(data => {
            console.log('data.data in delete in profile:', data.data)
            this.setState({posts: data.data.data})
        })
    }

    render() {
        
        const {isLoggedIn, userID, user, loggedInUser, first, last, image, size, edit, body, admin} = this.state
        console.log('admin:', admin)
        function confirm(e) {
            axios.delete(`/api/deleteuser/${userID}`).then( r => {
                message.success('Click on Yes');
                axios.post('/logout').then(() => {
                    this.setState({isLoggedIn: false})
                  }).catch(e => {console.log('Logout error', e)})
                window.location = '/'
            })
          }
          
          function cancel(e) {
            console.log(e);
            message.error('Click on No');
          }

          function callback(key) {
              console.log('key in tabs in profile', key)
          }

          let userPosts = this.state.posts.map((e,i) => {
              console.log('posts:', this.state.posts)
              return <Post  loggedUser={this.state.user} key={i} post_id={e.post_id} title={e.title} body={e.body} user_id={e.user_id} date={e.date} tracker={e.tracker} deletePostFn={this.deletePost}/>
          })

          let userProducts = this.state.products.map(e => {
              return <Products  donater={e.username} name={e.item_name} description = {e.description} image = {e.imageurl}/>
          })


        return (
            <div style={{padding: '5em'}}>
                <div>
                <div className='edit'>
                    {!edit  
                        ? loggedInUser === user ?
                        <div>
                            <Button size={size}type= 'dashed' style={{float: 'right'}} onClick={() => this.setState({edit: true})}>Edit</Button> 
                            <Link to='/donate'><Button size={size}type= 'dashed' style={{float: 'right'}}>Donate Product</Button></Link>
                        </div>
                            :  ''   
                    :<div>
                        <Popconfirm title="Are you sure delete this user? All of your posts, comments, and your profile will be deleted form our database and you will have to re-register" onConfirm={confirm} onCancel={cancel} okText="Yes" cancelText="No">
                                <a href="#">Delete</a>
                            </Popconfirm>
                        <Button size={size}type= 'dashed' style={{float: 'right'}} onClick={() => this.profileChange(user)}>Complete</Button>    
                            <TextArea value={body} rows ={4} onChange={(e) => this.handleChange('body', e.target.value)}/>
                                <Input type='file' onChange={e => this.handleImageUpload(e.target.files)}/>
                    </div>
                            }

                        {admin ? <Button size={size} type='dashed' style={{float: 'left'}}><Link to='/admin'>Admin Page</Link></Button>: ''}
                </div>
                <div className = 'avatar'>
                <Avatar icon ='user' style = {{alignContent: 'center', height: '12em', width: '12em', borderRadius: '50%'}} src={image}/>
                </div>
                    <h1 className = 'name'>{first} {last}</h1>
                        <div className='bio'>
                            {body}
                            </div> 


                
                
            </div>
            <Tabs onChange={callback} type="card">
            <TabPane tab="Posts" key="1">{userPosts}</TabPane>
            <TabPane tab="Products" key="2">{userProducts}</TabPane>
  </Tabs>
                {/* {userPosts}
                {userProducts} */}
            </div>
        );
    }
}

