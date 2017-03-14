import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import store from 'store';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes
});

router.beforeEach(async (to, from, next) => {
    try {
        await store.dispatch('init');
        const { isLogin } = store.state.status;
        const isLoginView = to.name === 'LOGIN';
        if (isLogin) {
            if (isLoginView) {
                next({ name: 'STOCK' });
            } else {
                next();
            }
        } else {
            if (isLoginView) {
                next();
            } else {
                next({ name: 'LOGIN' });
            }
        }
    } catch (e) {
        console.log(e);
    }
});

export default router;
