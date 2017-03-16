import Login from 'views/Login';
import HomeContainer from 'views/HomeContainer';
import Dashboard from 'views/dashboard';
import Stock from 'views/Stock';
import ClientAll from 'views/ClientAll';
import Client from 'views/Client';
import VenderAll from 'views/VenderAll';
import Vender from 'views/Vender';
import Delivery from 'views/Delivery';
import DeliveryAll from 'views/DeliveryAll';
import Purchase from 'views/Purchase';
import PurchaseAll from 'views/PurchaseAll';
import Returns from 'views/Returns';
import ReturnsAll from 'views/ReturnsAll';
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
                path: 'dashboard',
                name: 'DASHBOARD',
                component: Dashboard
            },
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
                name: 'DELIVERY_ALL',
                component: DeliveryAll
            },
            {
                path: 'delivery/:id',
                name: 'DELIVERY',
                component: Delivery
            },
            {
                path: 'purchase',
                name: 'PURCHASE_ALL',
                component: PurchaseAll
            },
            {
                path: 'purchase/:id',
                name: 'PURCHASE',
                component: Purchase
            },
            {
                path: 'returns',
                name: 'RETURNS_ALL',
                component: ReturnsAll
            },
            {
                path: 'returns/:id',
                name: 'RETURNS',
                component: Returns
            },
            {
                path: 'analysis',
                name: 'ANALYSIS',
                component: Analysis
            }
        ]
    }
];
