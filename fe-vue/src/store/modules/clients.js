/**
 * @file   clients 模块
 * @author SidKwok
 */

import * as types from '../mutations';
import { Get } from 'utils/api';

const state = {
    clients: []
};

const getters = {
    storeClients: state => state.clients
};

const mutations = {
    [types.SET_CLIENTS](state, { clients }) {
        state.clients = clients;
    },
    [types.CREATE_CLIENT](state, payload) {
        if (payload.objectId) {
            state.clients.push(payload);
        }
    }
};

const actions = {
    fetchClients: async ({ commit }) => {
        commit(types.START_GLOBAL_LOADING);
        try {
            const data = await Get('/api/show-clients');
            commit(types.SET_CLIENTS, data);
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
