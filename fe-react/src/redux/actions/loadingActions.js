import {
    START_GLOBAL_LOADING,
    END_GLOBAL_LOADING,
    START_LOCAL_LOADING,
    END_LOCAL_LOADING
} from '../constants/ActionTypes';

export const startGlobalLoading = () => ({ type: START_GLOBAL_LOADING });

export const endGlobalLoading = () => ({ type: END_GLOBAL_LOADING });

export const startLocalLoading = () => ({ type: START_LOCAL_LOADING });

export const endLocalLoading = () => ({ type: END_LOCAL_LOADING });
