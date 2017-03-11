import {
    START_LOADING,
    END_LOADING,
    TOGGLE_LOADING
} from '../constants/ActionTypes';

export const startLoading = () => ({ type: START_LOADING });

export const endLoading = () => ({ type: END_LOADING });

export const toggleLoading = () => ({ type: TOGGLE_LOADING });
