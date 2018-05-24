import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Profile from './Components/Profile/Profile';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Forums from './Components/Forums';
import Admin from './Components/Admin';
import Search from './Components/Search/Search';
import Home from './Components/Home';

const routes = 
<div>
    <Switch>
        <Route path='/home' component={ Home } />
        <Route path='/register' component={ Register } />
        <Route path='/login' component={ Login } />
        <Route path='/dashboard/:category' component={ Dashboard } />
        <Route path='/profile/:username' component={ Profile } />
        <Route path='/info' component={ Dashboard } />
        <Route path='/forums' component={ Forums } />
        <Route path='/admin' component={ Admin } />
        <Route path='/search' component={ Search } />
        <Route path='/' exact component={ Dashboard } />
        
    </Switch>
</div>


export default routes;