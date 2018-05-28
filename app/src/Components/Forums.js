import React, {Component} from 'react'
import './forums.css'
import {Link} from 'react-router-dom'


class Forums extends Component{
    constructor(){
        super()

        this.state = {

            categories: []
        }
    }
    render(){

        return(
            <div>
                <div className='forum-header'>
                        <h1 className='d-header-connect'>Connect.</h1>
                        <h1 className ='d-header-inspire'>Inspire.</h1>
                        <h1 className='d-header-love'>Thrive.</h1>
                        
                        </div>
                
                <div className='section-a-wrapper'>
                    <div className='section-a'>
                        <h1><strong>FAMILY</strong></h1>
                           
                            <Link to='/dashboard/family'><button>see posts</button></Link>
                    </div>
                    <div className='section-b'>
                        <h1><strong>RESOURCES</strong></h1>
                           
                            <Link to='/dashboard/resources'><button>see posts</button></Link>
                            
                    </div>
                    <div className='section-c'>
                        <h1><strong>NUTRITION</strong></h1>
                          
                            <Link to='/dashboard/nutrition'><button>see posts</button></Link>
                            
                    </div>
                    <div className='section-d'>
                        <h1><strong>MOTIVATION</strong></h1>
                            
                            <Link to='/dashboard/Motivation'><button>see posts</button></Link>
                            
                    </div>
                    <div className='section-e'>
                        <h1><strong>HEALTH</strong></h1>
                           
                            <Link to='/dashboard/health'><button>see posts</button></Link>
                            
                    </div>
                    <div className='section-f'>
                        <h1><strong>FINANCIAL</strong></h1>
                       <Link to='dashboard/financial'> <button>see posts</button></Link>
                            
                            
                    </div>
                    <input className='d-search'type='text' placeholder='search.....'></input>
                </div>
            </div>
        )
    }
}
export default Forums