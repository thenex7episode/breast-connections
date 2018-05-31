import React, { Component } from 'react';
import { Button, Spin, Icon, Tag, Divider } from 'antd';
import Image from './Image';
import axios from 'axios';
import Experience from './Experience';

const ButtonGroup = Button.Group;

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
            console.log(data.data);
            const total = data.data.reduce((total, el) => total + el.rating, 0);
            const avg =  total/data.data.length
            console.log('total', total)
            this.setState({experiences: data.data, loading: false, avg })
        })
    }

    deleteExperience(id){
        axios.delete(`/api/experience/${id}/${this.props.place_id}`).then(data => {
            this.setState({experiences: data.data})
        })
    }

    render() {
        const { name, adress, gRating, reference, createMode, place_id, types } = this.props;
        const experienceList = this.state.experiences.map((el,i) => {
            return <Experience deleteExperienceFn={this.deleteExperience} experience_id={el.experience_id} key={i} rating={el.rating} body={el.body} user_id={el.user_id}/> 
        })
        const tagList = types.map(el => <Tag>{el}</Tag>)
        // console.log('--Result', reference.photos || 'no photo')
        return (
            <div style={{borderRadius: '2px', textAlign: 'center', background: 'transparent', border: '1px solid rgba(0,0,0,.1)', width: '45%', margin: '0.5em'}}>
                <div key={name} className='place_container'>
                        <Image width={272} reference={reference} />
                        <div className='infoContainer'>
                            <div>
                                <h6 style={{fontWeight: '800'}}><a target='_blank' href={`https://www.google.com/search?q=${name}`}>{name}</a></h6>
                                <p style={{marginBottom: '1em'}}>{adress}</p>
                                <div>Google Rating: {gRating}</div>
                                <div>Tags: {tagList[0]}{tagList[1]}{tagList[2]}</div>
                            </div>
                                <div>
                                    <div>
                                        <Icon style={{fontSize: '1.2em', cursor: 'pointer'}} onClick={() => createMode(name, place_id)} type="primary" type="form"/>
                                    </div>
                                    <div>
                                        <Icon style={{fontSize: '1.2em', cursor: 'pointer', marginBottom: '0.5em'}} onClick={() => {
                                            this.setState({exp: !this.state.exp})
                                            this.getExperiences(place_id)
                                        }} type="down-square-o" ghost/>
                                    </div>
                                </div>
                        </div>
                </div>
                <div style={{display: this.state.exp ? 'block' : 'none', margin: '0.5em', fontWeight: '600'}}>
                    <Divider orientation='left'>{`${name}'s BC Score - ${this.state.avg || 0}/5 stars`}</Divider>
                    {this.state.loading
                    ? <Spin indicator={antIcon} />
                    : <div>{experienceList}</div>}
                </div>
            </div>
        );
    }
}