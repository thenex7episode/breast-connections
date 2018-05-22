import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Profile from './Components/Profile/Profile';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

const routes = 
<div>
    <Switch>
        <Route path='/register' component={ Register } />
        <Route path='/login' component={ Login } />
        <Route path='/dashboard/:category' component={ Dashboard } />
        <Route path='/profile/:username' component={ Profile } />
        <Route path='/info' component={ Dashboard } />
        <Route path='/' component={ Dashboard } />
    </Switch>
</div>


export default routes;