import * as types from '../constants/ActionTypes';

export const turnon = () => ({ type: types.TURN_ON });

export const turnoff = () => ({ type: types.TURN_OFF });

export const login = () => ({ type: types.LOGIN });

export const logout = () => ({ type: types.LOGOUT });

export const setUser = (user, userId) => ({
    type: types.SET_USER,
    payload: { user, userId }
});
