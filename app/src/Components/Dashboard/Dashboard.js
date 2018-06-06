import React, { Component } from 'react';
import { Button, Modal, Input, Upload, Icon, message, Spin } from 'antd';
import axios from 'axios';
import Post from '../Post/Post';
import './Dashboard.css';
const { TextArea } = Input;

const CLOUDINARY_UPLOAD_PRESET = 'Breast Connections';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/thenex7episode/image/upload';

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }


  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            loggedUser: '',
            createPost: false,
            loading: false,
            titleInput: '',
            bodyInput: '',
            loading: false,
            file: '',
            imageArray: []
        }
        this.deletePost = this.deletePost.bind(this)
    }

    handleImageUpload = (file) => {
        console.log('handleImageupload', file)
        // send Picture to Cloudinary
        axios.get('/api/upload').then(response => {
            let formData = new FormData();
            console.log(CLOUDINARY_UPLOAD_PRESET)
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            console.log(file[0]);
            formData.append('file', file[0])

            axios.post(CLOUDINARY_UPLOAD_URL, formData).then(response => {
                console.log('CLoudinary response', response.data)
                let newImageArray = this.state.imageArray.push(response.data.secure_url)
                this.setState({
                    image: newImageArray,
                    file: null
                })
            }).catch(err => console.log('cloudinary err', err))
        })
      }

    componentDidMount(){
        const category = this.props.match.params.category;
        axios.get(`/api/getposts/${category}`).then(data => {
            console.log('-d-a-t-a', data.data.data)
            this.setState({posts: data.data.data, loading: true})
        })
        axios.get(`/api/check-session/`).then( data => {
            console.log('session res', data)
            this.setState({loggedUser: data.data.username, loggedUserID: data.data.user_id})
        })
    }

    componentWillReceiveProps() {
        const category = this.props.match.params.category;
        axios.get(`/api/getposts/${category}`).then(data => {
            console.log('-d-a-t-a', data.data.data)
            this.setState({posts: data.data.data, loading: true})
        })
        axios.get(`/api/check-session/`).then( data => {
            console.log('session res', data)
            this.setState({loggedUser: data.data.username, loggedUserID: data.data.user_id})
        })
    }

    deletePost(id){
        axios.delete(`/api/deletepost/${id}`).then(data => {
            console.log(data.data)
            this.setState({posts: data.data.data})
        })
    }

    createPost(){
        const category = this.props.match.params.category;
        const post = {
            category,
            title: this.state.titleInput,
            body: this.state.bodyInput
        }
        axios.post('/api/addpost/', post).then(data => {
            this.setState({createPost: false, posts: data.data.data})
            // create DB Input format for backend
            const images = this.state.imageArray.map(el => {
                return {
                    post_id: data.data.lastID,
                    url: el
                }
            })
            console.log(images)
            axios.post('/api/images/', {
                    images: images
                }).then(data => {
                console.log('Image Upload Response', data)
            })
        })
    }

    deleteUpload(index){
        let newImageArray = this.state.imageArray;
        newImageArray.splice(index,1);
        this.setState({imageArray: newImageArray});
    }


    render() {
        const imageList = this.state.imageArray.map((el, i) => {
            return <div style={{position: 'relative', margin: '1em'}}>
                <Icon className='uploadIcon' onClick={() => this.deleteUpload(i)} type='close-circle'/>
                <img className='imageUpload' src={el} alt={'image Upload'} key={i} />
            </div>
        })
        console.log('rerender dashboard', imageList)
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
          const imageUrl = this.state.imageUrl;
        const postList = this.state.posts.map((el,i) => <Post  loggedUserID={this.state.loggedUserID} loggedUser={this.state.loggedUser} key={i} post_id={el.post_id} title={el.title} body={el.body} user_id={el.user_id} date={el.date} tracker={el.tracker} deletePostFn={this.deletePost}/>)
        return (
            <div style={{padding: '5em'}}>
                <div style={{display:'flex', justifyContent: 'space-between'}}>
                    <h2>{this.props.match.params.category}</h2>
                    <Button onClick={() => this.setState({createPost: true})} icon="form">Create Post</Button>
                </div>
                <Modal title="Create Post" visible={this.state.createPost} onOk={() => this.createPost()} onCancel={() => this.setState({createPost: false})}>
                    <Input onChange={e => this.setState({titleInput: e.target.value})}style={{margin: '1em 0'}} placeholder="set the Title of your Post" />
                    <TextArea onChange={e => this.setState({bodyInput: e.target.value})} rows={4} placeholder='what do you think?'/>
                    <input type='file' onChange={e => this.handleImageUpload(e.target.files)}/>
                    <div className='imageContainer'>
                        {imageList}
                    </div>
                </Modal>
                {this.state.loading
                ? <div>
                    {postList}
                </div>
                  
                : <Spin indicator={antIcon} />
                }
            </div>
        );
    }
}