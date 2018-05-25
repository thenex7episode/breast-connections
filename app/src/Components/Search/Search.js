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
            selectedLocation: ''
        }
    }

    getGoogleResults(){
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.selectedLocation}&key=AIzaSyDP2xc5L8pWjHE2vgmIRDCK-834Q2eGA0A`).then(data => {
            console.log(data.data.results[0].geometry.location)
            const type = {
                tags: this.state.selectedType,
                cords: data.data.results[0].geometry.location
            }
            axios.post('/api/googlesearch/', type).then(data => {
                this.setState({results: data.data.results})
                console.log(this.state.results)
            })
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
                <Input value={this.state.selectedLocation} onChange={e => this.setState({selectedLocation: e.target.value})}/>
                <Button onClick={() => this.getGoogleResults()}>Get Results</Button>
                <SearchList results={this.state.results}/>
            </div>
        );
    }
}