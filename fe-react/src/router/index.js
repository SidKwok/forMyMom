import React from 'react';
import {
    browserHistory,
    Router,
    Route,
    IndexRoute
} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import axios from 'axios';

import LoginView from 'views/LoginView';
import HomeContainer from 'views/HomeContainer';
import StockView from 'views/StockView';
import ClientAllView from 'views/ClientAllView';
import ClientView from 'views/ClientView';
import VenderAllView from 'views/VenderAllView';
import VenderView from 'views/VenderView';
import DeliveryView from 'views/DeliveryView';
import PurchaseView from 'views/PurchaseView';
import AnalysisView from 'views/AnalysisView';
import TestView from 'views/TestView';

import { routes } from './routes';

import store from '$redux/store';
import { statusActions } from '$redux/actions';

const history = syncHistoryWithStore(browserHistory, store);

// TODO: handle status when in login view

const onEnter = async ({ location }, replace, cb) => {
    try {
        const { isOn } = store.getState().status;
        if (!isOn) {
            const { isLogin, user, userId } = await axios.get('/auth/init').then(res => res.data);
            store.dispatch(statusActions.turnon());
            if (isLogin) {
                store.dispatch(statusActions.login());
                store.dispatch(statusActions.setUser(user, userId));
            } else {
                store.dispatch(statusActions.logout());
            }
        }
        const { isLogin } = store.getState().status;
        if (location.pathname === routes.LOGIN || isLogin) {
            cb();
        } else {
            replace(routes.LOGIN);
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
            <IndexRoute component={StockView} />
            <Route path={routes.STOCK} component={StockView} />
            <Route path={routes.CLIENT_ALL} component={ClientAllView} />
            <Route path={routes.CLIENT} component={ClientView} />
            <Route path={routes.VENDER_ALL} component={VenderAllView} />
            <Route path={routes.VENDER} component={VenderView} />
            <Route path={routes.DELIVERY} component={DeliveryView} />
            <Route path={routes.PURCHASE} component={PurchaseView} />
            <Route path={routes.ANALYSIS} component={AnalysisView} />
        </Route>
        <Route path={routes.TEST} component={TestView} />
    </Router>
);
