import {
    TURN_ON,
    TURN_OFF,
    LOGIN,
    LOGOUT,
    SET_USER
} from '../constants/ActionTypes';

export const turnon = () => ({ type: TURN_ON });

export const turnoff = () => ({ type: TURN_OFF });

export const login = () => ({ type: LOGIN });

export const logout = () => ({ type: LOGOUT });

export const setUser = (user, userId) => ({
    type: SET_USER,
    payload: { user, userId }
});
