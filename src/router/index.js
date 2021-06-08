import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeView from '../views/home';

const Router = () => {
    return (
        <Switch>
            <Route path="/" exact component={HomeView} />
        </Switch>
    );
};

export default Router;