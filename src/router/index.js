import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeView from '../views/home';
import PostJobView from '../views/postJob'
import ApplyJobView from '../views/applyJob'
import PositionDetailsView from '../views/positionDetails'

const Router = () => {
    return (
        <Switch>
            <Route path="/" exact component={HomeView} />
            <Route path="/PostJob" exact component={PostJobView} />
            <Route path="/ApplyJob" exact component={ApplyJobView} />
            <Route path="/PositionDetails" exact component={PositionDetailsView} />
        </Switch>
    );
};

export default Router;