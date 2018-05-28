import React, { Component } from 'react';
import { List, Avatar, Icon, Button, Modal, Input, Rate, message } from 'antd';
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

  const success = () => {
    message.success('Thanks for your Feedback!');
  };

export default class SearchList extends Component {
    constructor(props){
        super(props);
        this.state = {
            results: [],
            images: [],
            add: false,
            expInput: '',
            expRating: 0,
            currentID: ''
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
        const experience = {
            body: this.state.expInput,
            place_id: this.state.currentID,
            rating: this.state.expRating
        }
        axios.post('/api/experience/', experience).then(data => {
            console.log('Epxerience Posted');
            this.setState({add: false, expInput: '', currentID: '', expRating: '', images: []})+
            success()

        }).catch(err => console.log('Error in post Experience:', err))
    }

    createMode(name, place_id){
        this.setState({add: true, currentPlace: name, currentID: place_id})
    }


    render() {
        const resultsList = this.props.results.map((el,i) => {
            console.log('searchList', el)
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
                <Result place_id={el.place_id} key={i} name={el.name} adress={el.adress} gRating={el.rating ? gRating : 'no rating'} reference={el} createMode={this.createMode}/> 
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
        return (
                    <div>
                        <div>{resultsList}</div>
                        <Modal title={`Create Experience for ${this.state.currentPlace}`} visible={this.state.add} onOk={() => this.addExperience()} onCancel={() => this.setState({add: false})}>
                            <TextArea onChange={e => this.setState({expInput: e.target.value})} rows={4} placeholder='what do you think?'/>
                            <Rate onChange={value => this.setState({expRating: value})}/>
                        </Modal>
                    </div>
        );
    }
}