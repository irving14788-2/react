import React from 'react';

import { Home } from './pages/Home';
import  Login  from './pages/Login';
import { NotFound } from './pages/NotFound';

import { Switch } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/login" exact component={Login} props={childProps}/>
    <AppliedRoute path="/home" exact component={Home} props={childProps}/>
    <AppliedRoute component={NotFound}/>
  </Switch>
);
