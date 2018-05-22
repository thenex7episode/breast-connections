import React, { Component } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import Post from './Post';

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: []
        }
        this.deletePost = this.deletePost.bind(this)
    }

    componentDidMount(){
        const category = this.props.match.params.category;
        axios.get(`/api/getposts/${category}`).then(data => {
            console.log(data.data.data)
            this.setState({posts: data.data.data})
        })
    }

    deletePost(id){
        axios.delete(`/api/deletepost/${id}`).then(data => {
            console.log(data.data)
            this.setState({posts: data.data.data})
        })
    }


    render() {
        const postList = this.state.posts.map((el,i) => <Post  key={i} post_id={el.post_id} title={el.title} body={el.body} user_id={el.user_id} date={el.date} tracker={el.tracker} deletePostFn={this.deletePost}/>)
        return (
            <div>
                {postList}
            </div>
        );
    }
}