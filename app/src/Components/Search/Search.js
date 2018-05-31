import React, { Component } from 'react';
import axios from 'axios';
import { Button, Select, Input, Slider } from 'antd';
import SearchList from './SearchList';
import './Search.css';
const Option = Select.Option;
const InputGroup = Input.Group;



export default class Search extends Component {
    constructor(){
        super()
        this.state = {
            results: [],
            selectedType: 'doctor',
            selectedLocation: '',
            locationResponse: '',
            timer: null,
            radius: 30
        }
    }

    isTyping(e){
        clearTimeout(this.state.timer)
        this.setState({timer: setTimeout(() => {
            console.log('run get Location')
            this.getLocation()
        }, 500)})
    }

    getLocation(){
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.selectedLocation}&key=AIzaSyDP2xc5L8pWjHE2vgmIRDCK-834Q2eGA0A`).then(data => {
            console.log(data.data.results[0].geometry.location)
            this.setState({locationResponse: data.data.results[0].geometry.location})
        })
    }

    getGoogleResults(){
        console.log('results call')
        const type = {
            tags: this.state.selectedType,
            cords: this.state.locationResponse,
            radius: this.state.radius*1000
        }
        axios.post('/api/googlesearch/', type).then(data => {
            this.setState({results: data.data.results})
            console.log(this.state.results)
        })
    }

    render() {
        // console.log('--render Search!')
        const { selectedTags } = this.state;
        return (
            <div className='searchContainer' style={{padding: '5em', textAlign: 'center'}}>
                <h1>Search for Doctors and see rankings by BC Users</h1>
                <InputGroup style={{margin: '0 auto'}}compact>
                    <Select defaultValue="doctor" style={{ width: 120 }} onChange={(e) => this.setState({selectedType: e})}>
                        <Option value="doctor">Doctors</Option>
                        <Option value="hospital">Hospitals</Option>
                        <Option value="pharmacy">Pharmacies</Option>
                        <Option value="insurance_agency">Insurance Agencies</Option>
                    </Select>
                    <Input style={{width: '50%'}} value={this.state.selectedLocation} onChange={e => {
                        this.setState({selectedLocation: e.target.value})
                        this.isTyping()
                    }}/>
                    <Button>Search</Button>
                </InputGroup>
                <div style={{display: 'flex', justifyContent: 'space-between', width: '50%', margin: '0 auto', padding: '1em', alignItems: 'center'}}>
                    <div>Search Radius</div>
                    <Slider style={{margin: '1em auto', width: '50%', display: 'inline-block'}} tipFormatter={v => `${v} km`} onChange={e => this.setState({radius: e})} min={10} max={50} defaultValue={30} disabled={false} />
                    <div>{this.state.radius}</div>
                </div>
                <SearchList results={this.state.results}/>
            </div>
        );
    }
}