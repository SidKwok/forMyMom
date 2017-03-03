/**
 * @file   app 状态模块
 * @author SidKwok
 */
import * as types from '../mutation-types';
import axios from 'axios';
import router from '@/router';

const state = {
    isOn: false,
    isLogin: false,
    user: '',
    userId: ''
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
    },
    [types.SET_USER](state, { user, userId }) {
        state.user = user;
        state.userId = userId;
    }
};

const getters = {
    isOn: state => state.isOn,
    isLogin: state => state.isLogin
};

const actions = {
    async login({ commit }, { username, password }) {
        try {
            const { errNo, retData } = await axios.post('/auth/login', {
                username,
                password
            }).then(res => res.data);
            switch (errNo) {
                case 210:
                    throw new Error('用户名和密码不匹配');
                case 211:
                    throw new Error('没有找到该用户');
                case 219:
                    throw new Error('密码错误次数太多，请等候15分钟再尝试');
                default:
                    break;
            }
            const { user, userId } = retData;
            commit(types.LOGIN);
            commit(types.SET_USER, { user, userId });
            router.push({ name: 'WarehouseView' });
        } catch (e) {
            console.log(e.message);
        }
    },
    logout: ({ commit }) => commit(types.LOGOUT),
    turnOn: ({ commit }) => commit(types.TURN_ON),
    turnOff: ({ commit }) => commit(types.TURN_OFF)
};

export default {
    state,
    mutations,
    getters,
    actions
};
