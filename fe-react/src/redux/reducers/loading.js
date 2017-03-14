/**
 * @file   加载模块
 * @author SidKwok
 */

import {
    START_GLOBAL_LOADING,
    END_GLOBAL_LOADING,
    START_LOCAL_LOADING,
    END_LOCAL_LOADING
} from '../constants/ActionTypes';

const initialState = {
    global: false,
    local: false
};

export default function status(state = initialState, { type }) {
    switch (type) {
        case START_GLOBAL_LOADING:
            return { ...state, global: true };
        case END_GLOBAL_LOADING:
            return { ...state, global: false };
        case START_LOCAL_LOADING:
            return { ...state, local: true };
        case END_LOCAL_LOADING:
            return { ...state, local: false };
        default:
            return state;
    }
}
