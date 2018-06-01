import React from 'react'
import './banner.css'

const Banner = (props) => {

    return (
        <div className='d-banner' style={{background: props.imgUrl ? `url(${props.imgUrl})` : 'black'}}>
            <h1 className='d-banner-content1'>{props.text1}</h1>
            <h1 className='d-banner-content2'>{props.text2}</h1>
            <h1 className='d-banner-content3'>{props.text3}</h1>
        </div>
    );
};



export default Banner;