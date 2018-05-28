import React, { Component } from 'react';
import axios from 'axios';

export default class PostImage extends Component {
    constructor(){
        super();
        this.state = {
            images: []
        }
    }

    componentDidMount(){
        axios.get(`/api/images/${this.props.post_id}`).then(response => {
            this.setState({images: response.data})
        })
    }

    render() {
        const { post_id } = this.props;
        const imageList = this.state.images.map((el,i) => <div className='imageList' ><img className='postImage' src={el.url} alt={i}/></div>)
        return (
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                {imageList}
            </div>
        );
    }
}