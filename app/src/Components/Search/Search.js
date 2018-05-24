import React, { Component } from 'react';
import axios from 'axios';
import { Button, Select } from 'antd';
import SearchList from './SearchList';
const Option = Select.Option;



export default class Search extends Component {
    constructor(){
        super()
        this.state = {
            results: [],
            selectedType: ''
        }
    }

    getGoogleResults(){
        const type = {
            tags: this.state.selectedType
        }
        axios.post('/api/googlesearch/', type).then(data => {
            this.setState({results: data.data})
        })
    }

    render() {
        const { selectedTags } = this.state;
        return (
            <div>
                <h1>Search for Doctors and see rankings by BC Users</h1>
                <Select defaultValue="Doctors" style={{ width: 120 }} onChange={(e) => this.setState({selectedType: e})}>
                <Option value="doctor">Doctors</Option>
                <Option value="hospital">Hospitals</Option>
                <Option value="pharmacy">Pharmacies</Option>
                <Option value="insurance_agency">Insurance Agencies</Option>
                </Select>
                <Button onClick={() => this.getGoogleResults()}>Get Results</Button>
                <SearchList results={this.state.results}/>
            </div>
        );
    }
}