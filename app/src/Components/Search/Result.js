import React, { Component } from 'react';
import { Button, Spin, Icon } from 'antd';
import Image from './Image';
import axios from 'axios';
import Experience from './Experience';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


export default class Result extends Component {
    constructor(){
        super();
        this.state = {
            exp: false,
            experiences: [],
            loading: true
        }
        this.deleteExperience = this.deleteExperience.bind(this);
    }

    getExperiences(id){
        axios.get(`/api/experiences/${id}`).then(data => {
            this.setState({experiences: data.data, loading: false})
        })
    }

    deleteExperience(id){
        axios.delete(`/api/experience/${id}/${this.props.place_id}`).then(data => {
            this.setState({experiences: data.data})
        })
    }

    render() {
        const { name, adress, gRating, reference, createMode, place_id } = this.props;
        const experienceList = this.state.experiences.map((el,i) => {
            return <Experience deleteExperienceFn={this.deleteExperience} experience_id={el.experience_id} key={i} rating={el.rating} body={el.body} user_id={el.user_id}/> 
        })
        // console.log('--Result', reference.photos || 'no photo')
        return (
            <div style={{textAlign: 'center'}}>
                <div key={name} className='place_container'>
                        <div>
                            <h6>{name}</h6>
                            <p>{adress}</p>
                            <div className='ratingContainer'>
                                <div>Google {gRating}</div>
                                <div>BC {gRating}</div>
                            </div>
                            <Button onClick={() => createMode(name, place_id)}>Share your Experience</Button> 
                        </div>
                        <Image width={272} reference={reference} />
                </div>
                <Button onClick={() => {
                    this.setState({exp: !this.state.exp})
                    this.getExperiences(place_id)
                }}>Experiences</Button> 
                <div style={{display: this.state.exp ? 'block' : 'none'}}>
                    {this.state.loading
                    ? <Spin indicator={antIcon} />
                    : <div>{experienceList}</div>}
                </div>
            </div>
        );
    }
}