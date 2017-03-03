import LoginView from 'views/LoginView';
import HomeContainer from 'views/HomeContainer';
import WarehouseView from 'views/WarehouseView';
import ClientAllView from 'views/ClientAllView';
import ClientView from 'views/ClientView';
import VenderAllView from 'views/VenderAllView';
import VenderView from 'views/VenderView';
import AnalysisView from 'views/AnalysisView';

export default [
    {
        path: '/login',
        name: 'LoginView',
        component: LoginView
    },
    {
        path: '/',
        name: 'HomeContainer',
        component: HomeContainer,
        children: [
            {
                path: 'warehouse',
                name: 'WarehouseView',
                component: WarehouseView
            },
            {
                path: 'client',
                name: 'ClientAllView',
                component: ClientAllView
            },
            {
                path: 'client/:id',
                name: 'ClientView',
                component: ClientView
            },
            {
                path: 'vender',
                name: 'VenderAllView',
                component: VenderAllView
            },
            {
                path: 'vender/:id',
                name: 'VenderView',
                component: VenderView
            },
            {
                path: 'analysis',
                name: 'AnalysisView',
                component: AnalysisView
            }
        ]
    },
    {
        path: '*',
        redirect: '/'
    }
];
