import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Profile from './Components/Profile';
import Login from './Components/Login';
import Register from './Components/Register';
import Forums from './Components/Forums';
import Admin from './Components/Admin';

const routes = 
<div>
    <Switch>
        <Route path='/register' component={ Register } />
        <Route path='/login' component={ Login } />
        <Route path='/dashboard/:category' component={ Dashboard } />
        <Route path='/profile' component={ Profile } />
        <Route path='/info' component={ Dashboard } />
        <Route path='/' exact component={ Dashboard } />
        <Route path='/forums' component={ Forums } />
        <Route path='/admin' component={ Admin } />
        
    </Switch>
</div>


export default routes;