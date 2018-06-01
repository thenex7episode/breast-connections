import React from 'react';
import {Button} from 'antd'

const Products = (props) => {

    const {donater, description, name, image} = props
    return (
        <div>
            <img src={image} alt=""/>
       <p> Product: {name}</p>
         <p>  Description: {description}</p>
         <p>  Donater: {donater}</p>
        </div>
    );
};

export default Products;