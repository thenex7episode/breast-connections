import React from 'react'
import App from './App'
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {shallow, render, mount} from 'enzyme'
import { createSerializer}  from "enzyme-to-json"
import sinon from 'sinon'

describe('<App />', () => {
    it('renders 1 <App /> component', () =>{
        const component = shallow(<App />);
        expect(component).toHaveLength(1)
    })
})

