import React, { Component } from 'react';
import axios from 'axios';

export default class Image extends Component {
    constructor(){
        super();
        this.state = {
            image: ''
        }
    }

    componentDidMount(){
        console.log('--render Photos in did mount', this.props.reference.photos || 'no photos')
        if(this.props.reference.photos){
            axios.post(`/api/googleimage/${this.props.reference.photos[0].photo_reference}/`).then(data => {
                console.log('ref', data.data)
                this.setState({image: data.data})
            })
        } else {
                this.setState({image: 'https://app.widiz.com/plugins1/support/public/files/products/no-img.png'})
        }
    }
    // componentWillReceiveProps(){
    //     this.props.reference.photos ? console.log('new photos', this.props.reference.photos) : null
    //     if(this.props.reference.photos){
    //         axios.post(`/api/googleimage/${this.props.reference.photos[0].photo_reference}/`).then(data => {
    //             console.log('ref', data.data)
    //             this.setState({image: data.data})
    //         })
    //     } else {
    //             this.setState({image: 'https://app.widiz.com/plugins1/support/public/files/products/no-img.png'})
    //     }
    // }

    render() {
        return (
            <div>
                <img maxwidth='400' maxheight='400' src={this.state.image} alt='resultphoto' />
            </div>
        );
    }
    
}