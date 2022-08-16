import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './Components/Login.component';
import DashboardComponent from './Components/Dashboard.component';
import App from './App';
const Routes = () => (
    <Router basename='/index.html'>
        <switch>
            <Route path="/dashboard" component={DashboardComponent} />
            <Route path="/login" component={Login} />
            <Route path="/" exact component={App} />
        </switch>
    </Router>
);

export default Routes;
