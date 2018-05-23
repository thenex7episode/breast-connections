import React, {Component} from 'react'
import './forums.css'


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
                <div className='section-a-wrapper'>
                    <div className='section-a'>
                        <h1><strong>Family Support</strong></h1>
                            <p>
                            ley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic 

                            </p>
                            <button>see posts</button>
                    </div>
                    <div className='section-b'>
                        <h1><strong>Resources</strong></h1>
                            <p>
                            ley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic 

                            </p>
                            <button>see posts</button>
                            
                    </div>
                    <div className='section-c'>
                        <h1><strong>Health and Nutrition</strong></h1>
                            <p>
                            ley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic 

                            </p>
                            <button>see posts</button>
                            
                    </div>
                    <div className='section-d'>
                        <h1><strong>Motivations</strong></h1>
                            <p>
                            ley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic 

                            </p>
                            <button>see posts</button>
                            
                    </div>
                    <div className='section-e'>
                        <h1><strong>Doctor Recommendations</strong></h1>
                            <p>
                            ley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic 

                            </p>
                            <button>see posts</button>
                            
                    </div>
                    <div className='section-f'>
                        <h1><strong>Financial</strong></h1>
                            <p>
                            ley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic 

                            </p>
                            <button>see posts</button>
                            
                    </div>
                </div>
            </div>
        )
    }
}
export default Forums