import React, { Component } from 'react';
import { Button } from 'antd';
import Image from './Image';

export default class Result extends Component {


    render() {
        const { name, adress, gRating, reference, createMode } = this.props;
        console.log('--Result', reference.photos || 'no photo')
        return (
            <li className='place_container'>
                    <div>
                        <h6>{name}</h6>
                        <p>{adress}</p>
                        <div className='ratingContainer'>
                            <div>Google {gRating}</div>
                            <div>BC {gRating}</div>
                        </div>
                        <Button onClick={() => createMode(name)}>Share your Experience</Button> 
                    </div>
                    <Image width={272} reference={reference} />
                </li>
        );
    }
}