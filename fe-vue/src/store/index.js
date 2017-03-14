/**
 * @file store 容器
 * @author SidKwok
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import modules from './modules';

Vue.use(Vuex);

const store = new Vuex.Store({
    actions,
    modules,
    strict: true
});

if (module.hot) {
    module.hot.accept(['./mutations', './modules'], () => {
        const newMutations = require('./mutations').default;
        const newModules = require('./modules').default;
        // hot reload
        store.hotUpdate({
            mutations: newMutations,
            modules: newModules
        });
    });
}

export default store;
