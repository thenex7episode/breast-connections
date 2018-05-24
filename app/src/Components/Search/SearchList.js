import React, { Component } from 'react';
import { List, Avatar, Icon } from 'antd';
import axios from 'axios';
import Image from './Image';

const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

  const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

export default class SearchList extends Component {
    constructor(props){
        super(props);
        this.state = {
            results: [],
            images: []
        }
    }

    getImage(ref){
        console.log(ref)
        if(ref.photos){
            axios.post(`/api/googleimage/${ref.photos[0].photo_reference}/`).then(data => {
                console.log('ref', data.data)
                return 'https://lh3.googleusercontent.com/p/AF1QipOSztHdWV4-PZf8hPegi8K3BCSuut9eToblAIsb=s1600-w400-h400'
            })
        } else {
            console.log('static image')
                return 'https://app.widiz.com/plugins1/support/public/files/products/no-img.png'
        }
    }


    render() {
        return (
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={this.props.results}
                        footer={<div><b>ant design</b> footer part</div>}
                        renderItem={item => (
                        <List.Item
                            key={item.name}
                            actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                            extra={<Image width={272} reference={item} />}
                        >
                            <List.Item.Meta
                            // avatar={<Avatar src={item.photos[0] || null} />}
                            title={<a href={item.name}>{item.name}</a>}
                            description={item.adress}
                            />
                            {item.content}
                        </List.Item>
                        )}
                    />
        );
    }
}