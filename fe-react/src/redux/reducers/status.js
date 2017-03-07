/**
 * @file   app 状态模块
 * @author SidKwok
 */
import {
    TURN_ON,
    TURN_OFF,
    LOGIN,
    LOGOUT,
    SET_USER
} from '../constants/ActionTypes';

const initialState = {
    isOn: false,
    isLogin: false,
    user: '',
    userId: ''
};

export default function status(state = initialState, { type, payload }) {
    switch (type) {
        case TURN_ON:
            return { ...state, isOn: true };
        case TURN_OFF:
            return { ...state, isOn: false };
        case LOGIN:
            return { ...state, isLogin: true };
        case LOGOUT:
            return { ...state, isLogin: false };
        case SET_USER:
            return {
                ...state,
                ...payload
            };
        default:
            return state;
    }
}
