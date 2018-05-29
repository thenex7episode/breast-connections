import React, { Component } from 'react';
import { List, Avatar, Icon, Button, Modal, Input, Rate } from 'antd';
import axios from 'axios';
import Image from './Image';
import Result from './Result';

const TextArea = Input.TextArea;

const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

export default class SearchList extends Component {
    constructor(props){
        super(props);
        this.state = {
            results: [],
            images: [],
            add: false,
            expInput: '',
            expRating: 0
        }
        this.createMode = this.createMode.bind(this)
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

    addExperience(){

    }

    createMode(name){
        this.setState({add: true, currentPlace: name})
    }


    render() {
        // console.log('--render Searchlist!')
        const resultsList = this.props.results.map((el,i) => {
            const star = <Icon type="star" />
            let gRating = [];
            let bRating = [];
            for(let i = 0; i < el.rating; i++){
                gRating.push(star)
            }
            for(let i = 0; i < el.rating; i++){
                bRating.push(star)
            }
            return (
                <Result key={i} name={el.name} adress={el.adress} gRating={el.rating ? gRating : 'no rating'} reference={el} createMode={this.createMode}/> 
                // <li className='place_container'>
                //     <div>
                //         <h6>{el.name}</h6>
                //         <p>{el.adress}</p>
                //         <div className='ratingContainer'>
                //             <div>Google {el.rating ? gRating : 'no rating'}</div>
                //             <div>BC {el.rating ? bRating : 'no rating'}</div>
                //         </div>
                //         <Button onClick={() => this.setState({add: true, currentPlace: el.name})}>Share your Experience</Button> 
                //     </div>
                //     <Image width={272} reference={el} />
                // </li>
            )
        })
                console.log('--render Searchlist!', resultsList)
        return (
                    <div>
                        <div>{resultsList}</div>
                        <Modal title={`Create Experience for ${this.state.currentPlace}`} visible={this.state.add} onOk={() => this.addExperience()} onCancel={() => this.setState({add: false})}>
                            <TextArea onChange={e => this.setState({bodyInput: e.target.value})} rows={4} placeholder='what do you think?'/>
                            <Rate onChange={value => this.setState({expRating: value})}/>
                        </Modal>
                    </div>
        );
    }
}