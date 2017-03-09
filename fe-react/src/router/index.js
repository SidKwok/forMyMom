import React from 'react';
import {
    browserHistory,
    Router,
    Route,
    IndexRoute
} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import RootContainer from 'views/RootContainer';
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
import actions from '$redux/actions';

const history = syncHistoryWithStore(browserHistory, store);

// TODO: handle status when in login view

const onEnter = async ({ location }, replace, cb) => {
    try {
        await store.dispatch(actions.init());
        const { isLogin } = store.getState().status;
        const isLoginView = location.pathname === routes.LOGIN;
        if (isLogin) {
            if (isLoginView) {
                replace(routes.STOCK);
                cb();
            } else {
                cb();
            }
        } else {
            if (isLoginView) {
                cb();
            } else {
                replace(routes.LOGIN);
                cb();
            }
        }
    } catch (e) {
        console.log(e);
        cb();
    }
};

export default () => (
    <Router history={history} key={Math.random()} >
        <Route path={routes.ROOT} component={RootContainer} onEnter={onEnter}>
            <Route path={routes.LOGIN} component={LoginView} />
            <Route path={routes.HOME} component={HomeContainer}>
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
        </Route>
    </Router>
);
