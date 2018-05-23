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
        }
    }
  componentDidMount() {
    axios.get('/api/posts/').then(data => {
        this.setState({data: data.data, loading: false})
    })
  }
 

  render() {
    const { loading, loadingMore, showLoadingMore, data } = this.state;
    const loadMore = showLoadingMore ? (
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        {loadingMore && <Spin />}
        {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
      </div>
    ) : null;
    return (
      <List
        loading={loading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={data}
        renderItem={item => (
          <List.Item actions={[<a>edit</a>, <a>more</a>]}>
            <List.Item.Meta
              title={`${item.title} von ${item.user_id}`}
              description={item.body}
            />
            <div>{item.date}</div>
          </List.Item>
        )}
      />
    );
  }
}