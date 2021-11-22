import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from '../components/index';
import { Login, Home } from '../views/index';
import { selectUser } from '../store/slices/userSlice';
import { useSelector } from 'react-redux';

const AppRouter = () => {
    const user = useSelector(selectUser)
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Login></Login>
                </Route>
                <Route path="/:path">
                    <Navbar user={`${user.first_name} ${user.last_name}`}></Navbar>
                    <Route path="/home">
                        <Home></Home>
                    </Route>
                </Route> 
            </Switch>
        </Router>
    );
};

export default AppRouter;