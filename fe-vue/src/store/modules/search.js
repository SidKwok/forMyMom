import * as types from '../mutations';

const state = {
    str: ''
};

const getters = {
    searchStr: state => state.str
};

const mutations = {
    [types.EDIT_SEARCH](state, { str }) {
        state.str = str;
    },
    [types.CLEAR_SEARCH](state) {
        state.str = '';
    }
};

const actions = {
    editSearch({ commit }, { str }) {
        commit(types.EDIT_SEARCH, { str });
    },
    clearSearch({ commit }) {
        commit(types.CLEAR_SEARCH);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
