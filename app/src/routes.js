import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Profile from './Components/Profile/Profile';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Chatroom from './Components/Chatroom/Chatroom'

const routes = 
<div>
    <Switch>
        <Route path='/register' component={ Register } />
        <Route path='/login' component={ Login } />
        <Route path='/dashboard/:category' component={ Dashboard } />
        <Route path='/profile/:username' component={ Profile } />
        <Route path='/info' component={ Dashboard } />
        <Route path='/' exact component={ Dashboard } />
        
        <Route path='/chat' component={Chatroom} />
    </Switch>
</div>


export default routes;