import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard.js';

const routes = 
<div>
    <Switch>
        <Route path='/register' component={ Dashboard } />
        <Route path='/login' component={ Dashboard } />
        <Route path='/dashboard/:category' component={ Dashboard } />
        <Route path='/profile' component={ Dashboard } />
        <Route path='/info' component={ Dashboard } />
        <Route path='/' component={ Dashboard } />
    </Switch>
</div>


export default routes;