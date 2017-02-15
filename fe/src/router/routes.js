import HomeContainer from 'views/HomeContainer';
import LoginPage from 'views/LoginPage';

export default [
    {
        path: '/',
        name: 'home-container',
        component: HomeContainer
    },
    {
        path: '/login',
        name: 'login-page',
        component: LoginPage
    }
];
