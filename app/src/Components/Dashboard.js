import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import axios from 'axios';
import Post from './Post';
import { Input } from 'antd';
import { Upload, Icon, message } from 'antd';
const { TextArea } = Input;

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

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            loggedUser: '',
            createPost: false,
            loading: false,
            titleInput: '',
            bodyInput: ''
        }
        this.deletePost = this.deletePost.bind(this)
    }

    handleChange = (info) => {
        console.log('handleImageupload', info)
        // send Picture to Cloudinary

        // receive imageUrl, set it to state and send it to the Database

        // 
      }

    componentDidMount(){
        const category = this.props.match.params.category;
        axios.get(`/api/getposts/${category}`).then(data => {
            this.setState({posts: data.data.data})
        })
        axios.get(`/api/check-session/`).then( data => {
            console.log('session res', data)
            this.setState({loggedUser: data.data.username})
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
        })
    }


    render() {
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
          const imageUrl = this.state.imageUrl;
        const postList = this.state.posts.map((el,i) => <Post  loggedUser={this.state.loggedUser} key={i} post_id={el.post_id} title={el.title} body={el.body} user_id={el.user_id} date={el.date} tracker={el.tracker} deletePostFn={this.deletePost}/>)
        return (
            <div>
                <div style={{display:'flex', justifyContent: 'space-between'}}>
                    <h2>{this.props.match.params.category}</h2>
                    <Button onClick={() => this.setState({createPost: true})} icon="form">Create Post</Button>
                </div>
                <Modal title="Create Post" visible={this.state.createPost} onOk={() => this.createPost()} onCancel={() => this.setState({createPost: false})}>
                    <Input onChange={e => this.setState({titleInput: e.target.value})}style={{margin: '1em 0'}} placeholder="set the Title of your Post" />
                    <TextArea onChange={e => this.setState({bodyInput: e.target.value})} rows={4} placeholder='what do you think?'/>
                    <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="//jsonplaceholder.typicode.com/posts/"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                    >
                    {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                </Upload>
                </Modal>
                <div>
                    {postList}
                </div>
            </div>
        );
    }
}