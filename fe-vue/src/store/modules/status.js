/**
 * @file   app 状态模块
 * @author SidKwok
 */
import axios from 'axios';
import router from 'router';
import * as types from '../mutations';

const state = {
    isOn: false,
    isLogin: false,
    user: '',
    userId: ''
};

const getters = {
    isLogin: state => state.isLogin,
    userInfo: ({ user, userId }) => ({ user, userId })
};

const mutations = {
    [types.TURN_ON](state) {
        state.isOn = true;
    },
    [types.TURN_OFF](state) {
        state.isOn = false;
    },
    [types.LOGIN](state) {
        state.isLogin = true;
    },
    [types.LOGOUT](state) {
        state.isLogin = false;
        router.replace({ name: 'LOGIN' });
    },
    [types.SET_USER](state, { user, userId }) {
        state.user = user;
        state.userId = userId;
    }
};

const actions = {
    init: async ({ commit, state }) => {
        try {
            const { isOn } = state;
            if (!isOn) {
                const { isLogin, user, userId } = await axios
                    .get('/auth/init')
                    .then(({ data }) => data);
                commit(types.TURN_ON);
                if (isLogin) {
                    commit(types.LOGIN);
                    commit(types.SET_USER, { user, userId });
                }
            }
        } catch (e) {
            console.log(e);
        }
    },
    signIn: async ({ commit, state }, { username, password }) => {
        try {
            const { errNo, retData } = await axios
                .post('/auth/login', {
                    username,
                    password
                })
                .then(({ data }) => data);
            if (errNo !== 0) {
                throw new Error('sth wrong');
            }
            commit(types.LOGIN);
            commit(types.SET_USER, retData);
            router.push({ name: 'STOCK' });
        } catch (e) {
            console.log(e);
        }
    },
    signOut: async({ commit }) => {
        try {
            await axios.post('/auth/logout');
            commit(types.LOGOUT);
        } catch (e) {
            console.log(e);
        }
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
