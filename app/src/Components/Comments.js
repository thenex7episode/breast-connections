import React, { Component } from 'react';
import Comment from './Comment';
import { Input } from 'antd';
import axios from 'axios';


export default class Comments extends Component {
    constructor(props){
        super(props);
        this.state = {
            comments: [],
            bodyInput: ''
        }
        this.deleteComment = this.deleteComment.bind(this);
    }

    componentDidMount(){
        axios.get(`/api/getcomments/${this.props.post_id}`).then(data => {
            this.setState({comments: data.data})
        })
    }

    deleteComment(id){
        console.log('delete ID', id)
        axios.delete(`/api/deletecomment/${id}/${this.props.post_id}`).then(data => {
            this.setState({comments: data.data})
        })
    }

    addComment(){
        const comment = {
            post_id: this.props.post_id,
            body: this.state.bodyInput
        }
        console.log('comment object', comment)
        axios.post('/api/addcomment/', comment).then(data => {
            this.setState({comments: data.data})
        })
    }

    render() {
        const commentsList = this.state.comments.map(el => <Comment deleteCommentFn={this.deleteComment} comment_id={el.comment_id} body={el.body} user_id={el.user_id} date={el.date}/>)
        return (
            <div>
                <hr/>
                <span style={{fontSize: '1.3em'}}>Comments</span>
                <ul>
                    {commentsList}
                </ul>
                <Input onKeyPress={e => {
                    if(e.key === 'Enter'){
                        this.addComment()
                    }
                }} onChange={e => this.setState({bodyInput: e.target.value})} placeholder="enter a comment" />
            </div>
        );
    }
}