import React, { Component } from 'react';
import './info.css'

export default class Info extends Component {
    render() {
        return (
            <div className = 'info'>
                <h1>About Breast Connections</h1>
                <p>Breast connections is a non-profit social media platform that gives cancer patients, family/friends of cancer patients, and anyone 
                    who wants to know about cancer the ability to interact with each other about experiences, tips, tricks, and over all support for their
                    process through these difficult times. This website was created by junior developers William Lambermont, Bendedikt Mix, And Derek Hansen.
                    </p>

                   <p> William's Step Mother was diagnosed with breast cancer in 2015 and during her time through Chemo Therapy she had no resourses for what she 
                    should be doing, how to make it through, and while she was looking there were no good online platforms so she asked her step-son to make this
                    and so he and 2 friends of his made this as a group project at their coding bootcamp DevMountain. She made a full recovery in 2017.
                    </p>
                    <p>
                    On this site you can ask other people about stuff they have done in the past having beaten cancer, what people are doing currently going 
                    through Chemo, or what other family members or friends are doing to help. There are different categories for posts under the forums tab 
                    that will allow you to post what you need to know based off what you want to know. You can post a question or about and what you've been 
                    doing and let people reply to you.
                </p>
            </div>
        );
    }
}