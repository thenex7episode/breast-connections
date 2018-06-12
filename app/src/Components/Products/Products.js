import React from 'react';
import {Button} from 'antd'
import './Products.css'

const Products = (props) => {

    const {donater, description, name, image} = props
    return (
        <div class='products'>
        <div className='list'>
            <ul>
               <li>Product: {name}</li>
                <li>Donater: <a href={`/profile/${donater}`}>{donater}</a></li>
            </ul>
        </div>
            <img src={image} alt=""/>
                <h1 className='des'>{description}</h1>
        </div>
    );
};

export default Products;

