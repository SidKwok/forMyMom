/**
 * @file   loading 模块
 * @author SidKwok
 */
import * as types from '../mutation-types';

const state = {
    isLoading: false
};

const mutations = {
    [types.START_LOADING](state) {
        state.isLoading = true;
    },
    [types.DONE_LOADING](state) {
        state.isLoading = false;
    }
};

const getters = {
    isLoading: state => state.isLoading
};

const actions = {
    startLoading: ({ commit }) => commit(types.START_LOADING),
    doneLoading: ({ commit }) => commit(types.DONE_LOADING),
    toggleLoading({ commit, state }) {
        if (state.isLoading) {
            commit(types.DONE_LOADING);
        } else {
            commit(types.START_LOADING);
        }
    }
};

export default {
    state,
    mutations,
    getters,
    actions
};
