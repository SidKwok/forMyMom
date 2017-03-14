/**
 * @file   loading 模块
 * @author SidKwok
 */
import * as types from '../mutations';

const state = {
    global: false
};

const getters = {
    global: state => state.global,
    local: state => state.local
};

const mutations = {
    [types.START_GLOBAL_LOADING](state) {
        state.global = true;
    },
    [types.DONE_GLOBAL_LOADING](state) {
        state.global = false;
    },
    [types.START_LOCAL_LOADING](state) {
        state.local = true;
    },
    [types.DONE_LOCAL_LOADING](state) {
        state.local = false;
    }
};

const actions = {};

export default {
    state,
    getters,
    mutations,
    actions
};
