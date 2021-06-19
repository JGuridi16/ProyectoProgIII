import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeView from '../views/home';
import PostJobView from '../views/postJob'

const Router = () => {
    return (
        <Switch>
            <Route path="/" exact component={HomeView} />
            <Route path="/PostJob" exact component={PostJobView} />
        </Switch>
    );
};

export default Router;