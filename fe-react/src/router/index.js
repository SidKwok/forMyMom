import React from 'react';
import {
    browserHistory as history,
    Router,
    Route,
    IndexRoute
} from 'react-router';
import axios from 'axios';

import LoginView from 'views/LoginView';
import HomeContainer from 'views/HomeContainer';
import WarehouseView from 'views/WarehouseView';
import ClientAllView from 'views/ClientAllView';
import ClientView from 'views/ClientView';
import VenderAllView from 'views/VenderAllView';
import VenderView from 'views/VenderView';
import AnalysisView from 'views/AnalysisView';
import TestView from 'views/TestView';

import store from '$redux/store';
import * as actions from '$redux/actions';

// TODO: handle status when in login view

const onEnter = async ({ location }, replace, cb) => {
    try {
        const { isOn } = store.getState().status;
        if (!isOn) {
            const { isLogin, user, userId } = await axios.get('/auth/init').then(res => res.data);
            store.dispatch(actions.turnon());
            if (isLogin) {
                store.dispatch(actions.login());
                store.dispatch(actions.setUser(user, userId));
            } else {
                store.dispatch(actions.logout());
            }
        }
        const { isLogin } = store.getState().status;
        if (location.pathname === '/login' || isLogin) {
            cb();
        } else {
            replace('/login');
            cb();
        }
    } catch (e) {
        console.log(e);
        cb();
    }
};

export default () => (
    <Router history={history} key={Math.random()} >
        <Route path='/login' component={LoginView} />
        <Route path='/' component={HomeContainer} onEnter={onEnter}>
            <IndexRoute component={WarehouseView} />
            <Route path='warehouse' component={WarehouseView} />
            <Route path='client' component={ClientAllView} />
            <Route path='client/:id' component={ClientView} />
            <Route path='vender' component={VenderAllView} />
            <Route path='vender/:id' component={VenderView} />
            <Route path='analysis' component={AnalysisView} />
        </Route>
        <Route path='/test' component={TestView} />
    </Router>
);
