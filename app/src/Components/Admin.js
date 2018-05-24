import { List, Avatar, Button, Spin } from 'antd';
import React, { Component } from 'react';
import axios from 'axios';

export default class Admin extends Component {
    constructor(){
        super();
        this.state = {
          loading: true,
          loadingMore: false,
          showLoadingMore: true,
          data: [],
          admin: ''
        }
    }
  componentDidMount() {
    axios.get('/api/posts/').then(data => {
        this.setState({data: data.data, loading: false})
    })
    axios.get('/api/check-session').then(response => {
            this.setState({admin: response.data.admin})
        })
    }

  deletePost(id){
    axios.delete(`/api/deletepost/${id}`).then(data => {
        console.log(data.data)
        this.setState({data: data.data.data})
        })
    }
 

  render() {
    const { loading, loadingMore, showLoadingMore, data } = this.state;
    return (
    <div>
        <h1>Administration</h1>
        <div style={{display: this.state.admin ? 'none' : 'block'}}>
            <h3>You don't seem to be an Admin. If you are, log in with an Admin Account, otherwise click on Forum to </h3>
        </div>
        <div style={{display: this.state.admin ? 'block' : 'none'}}>
        <List
            loading={loading}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
            <List.Item actions={[<a onClick={() => this.deletePost(item.post_id)}>delete</a>,<a>User ID: {item.user_id}</a>]}>
                <List.Item.Meta
                title={item.title}
                description={item.body}
                />
                <div>{item.date}</div>
            </List.Item>
            )}
        />
        </div>
    </div>
    );
  }
}