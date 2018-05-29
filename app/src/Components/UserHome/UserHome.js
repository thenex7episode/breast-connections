import React, { Component } from 'react';
import axios from 'axios'
import './userhome.css'
import Post from '../Post/Post'
import Sidebar from '../Sidebar/Sidebar'


class UserHome extends Component{
    constructor(){
        super()

        this.state = {

            posts: []

        }
    }
    componentDidMount(){
        axios.get('/api/posts/').then(response => {
            console.log('all posts-----------------------------',response)
            this.setState({posts: response.data})
        })
    }

    render(){
        const allPosts = this.state.posts.map((el,i) => {
            return (
              <div className='d-posts-wrapper'>
              <div className='d-posts-content'>
            <Post loggedUser={this.state.loggedUser} key={i} post_id={el.post_id} title={el.title} body={el.body} user_id={el.user_id} date={el.date} tracker={el.tracker} deletePostFn={this.deletePost}/>
                </div>
                </div>
            )
        })
        return <div>
            <div className="d-userhome-header">
                <div className='d-userhome-content'>
                    <h1 className='d-connect'>Connect.</h1>
                    <h1 className='d-inspire'>Inspire.</h1>
                    <h1 className='d-thrive'>Thrive.</h1>
                </div> 
            </div>
            
            {allPosts}
            
        </div>
     }
}
export default UserHome;