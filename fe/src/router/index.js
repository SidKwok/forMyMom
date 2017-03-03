import Vue from 'vue';
import Router from 'vue-router';
import store from 'state/store';
import routes from './routes';
import axios from 'axios';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes
});
router.beforeEach(async (to, from, next) => {
    try {
        const { isOn } = store.state.status;
        if (!isOn) {
            const { isLogin, user, userId } = await axios.get('/auth/init').then(res => res.data);
            store.dispatch('turnOn');
            if (isLogin) {
                store.commit('LOGIN');
                store.commit('SET_USER', {
                    user,
                    userId
                });
            } else {
                store.commit('LOGOUT');
            }
        }
        const { isLogin } = store.state.status;
        if (to.name === 'LoginView' || isLogin) {
            next();
        } else {
            next('/login');
        }
    } catch (e) {
        next();
    }
});

export default router;
