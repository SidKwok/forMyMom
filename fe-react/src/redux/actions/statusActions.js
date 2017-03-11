import axios from 'axios';
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

export const init = () => async (dispatch, getState) => {
    try {
        const { isOn } = getState().status;
        if (!isOn) {
            const { isLogin, user, userId } = await axios
                .get('/auth/init')
                .then(({ data }) => data);
            dispatch(turnon());
            if (isLogin) {
                dispatch(login());
                dispatch(setUser(user, userId));
            }
        }
    } catch (e) {
        console.log(e);
    }
};

export const signIn = (username, password) => async dispatch => {
    let signal = 0;
    try {
        const { errNo, retData } = await axios
            .post('/auth/login', {
                username,
                password
            })
            .then(({ data }) => data);
        if (errNo !== 0) {
            throw new Error('sth wrong');
        }
        dispatch(login());
        dispatch(setUser(retData.user, retData.userId));
    } catch (e) {
        // handle error
        console.log(e);
        signal = -1;
    }
    return signal;
};

export const signOut = () => async dispatch => {
    try {
        await axios.post('/auth/logout');
        dispatch(logout());
    } catch (e) {
        console.log(e);
    }
};
