import React from 'react'
import App from './App'


describe('<App />', () => {
    it('renders 1 <App /> component', () =>{
        const component = shallow(<App />);
        expect(component).toHaveLength(1)
    })
})

