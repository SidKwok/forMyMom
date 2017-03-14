import Login from 'views/Login';
import HomeContainer from 'views/HomeContainer';
import Stock from 'views/Stock';
import ClientAll from 'views/ClientAll';
import Client from 'views/Client';
import VenderAll from 'views/VenderAll';
import Vender from 'views/Vender';
import Delivery from 'views/Delivery';
import Purchase from 'views/Purchase';
import Analysis from 'views/Analysis';

export default [
    {
        path: '/login',
        name: 'LOGIN',
        component: Login
    },
    {
        path: '/',
        name: 'HOME_CONTAINER',
        component: HomeContainer,
        children: [
            {
                path: 'stock',
                name: 'STOCK',
                component: Stock
            },
            {
                path: 'client',
                name: 'CLIENT_ALL',
                component: ClientAll
            },
            {
                path: 'client/:id',
                name: 'CLIENT',
                component: Client
            },
            {
                path: 'vender',
                name: 'VENDER_ALL',
                component: VenderAll
            },
            {
                path: 'vender/:id',
                name: 'VENDER',
                component: Vender
            },
            {
                path: 'delivery',
                name: 'DELIVERY',
                component: Delivery
            },
            {
                path: 'purchase',
                name: 'PURCHASE',
                component: Purchase
            },
            {
                path: 'analysis',
                name: 'ANALYSIS',
                component: Analysis
            }
        ]
    }
];
