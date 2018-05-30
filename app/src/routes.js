import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Profile from './Components/Profile/Profile';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Chatroom from './Components/Chatroom/Chatroom'
import Forums from './Components/Forums';
import Admin from './Components/Admin';
import Search from './Components/Search/Search';
import Home from './Components/Home';
import Info from './Components/Info/Info'
import UserHome from './Components/UserHome/UserHome'
import Shop from './Components/Shop/Shop'

const routes = 
<div>
    <Switch>
        <Route path='/userhome' component={ UserHome } />
        <Route path='/register' component={ Register } />
        <Route path='/login' component={ Login } />
        <Route path='/dashboard/:category' component={ Dashboard } />
        <Route path='/profile/:username' component={ Profile } />
        <Route path='/info' component={ Info } />
        <Route path='/chat' component={Chatroom} /> 
        <Route path='/forums' component={ Forums } />
        <Route path='/admin' component={ Admin } />
        <Route path='/search' component={ Search } />
        <Route path='/dashboard' component={ UserHome } />
        <Route path='/shop' component={Shop}/>
        <Route path='/' component={ Home } />
        
    </Switch>
</div>


export default routes;