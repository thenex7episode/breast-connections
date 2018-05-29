import React, { Component } from 'react';
import axios from 'axios';
import { Button, Select, Input } from 'antd';
import SearchList from './SearchList';
import './Search.css';
const Option = Select.Option;



export default class Search extends Component {
    constructor(){
        super()
        this.state = {
            results: [],
            selectedType: '',
            selectedLocation: '',
            locationResponse: '',
            timer: null
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
            cords: this.state.locationResponse
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
            <div style={{padding: '5em'}}>
                <h1>Search for Doctors and see rankings by BC Users</h1>
                <Select defaultValue="doctor" style={{ width: 120 }} onChange={(e) => this.setState({selectedType: e})}>
                    <Option value="doctor">Doctors</Option>
                    <Option value="hospital">Hospitals</Option>
                    <Option value="pharmacy">Pharmacies</Option>
                    <Option value="insurance_agency">Insurance Agencies</Option>
                </Select>
                <Input value={this.state.selectedLocation} onChange={e => {
                    this.setState({selectedLocation: e.target.value})
                    this.isTyping()
                }}/>
                <Button onClick={() => this.getGoogleResults()}>Get Results</Button>
                <SearchList results={this.state.results}/>
            </div>
        );
    }
}