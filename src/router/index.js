import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login, Home } from '../views/index';

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Login></Login>
                </Route>
                <Route path="/home">
                    <Home></Home>
                </Route>
            </Switch>
        </Router>
    );
};

export default AppRouter;