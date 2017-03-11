/**
 * @file   加载模块
 * @author SidKwok
 */

import {
    START_LOADING,
    END_LOADING,
    TOGGLE_LOADING
} from '../constants/ActionTypes';

const initialState = false;

export default function status(state = initialState, { type }) {
    switch (type) {
        case START_LOADING:
            return true;
        case END_LOADING:
            return false;
        case TOGGLE_LOADING:
            return !state;
        default:
            return state;
    }
}
