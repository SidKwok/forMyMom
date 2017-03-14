import {
    SET_CLIENTS,
    CREATE_CLIENT
} from '../constants/ActionTypes';
import {
    startGlobalLoading,
    endGlobalLoading
} from './loadingActions';
import { Get, Post } from 'utils/api';
import normalize from 'utils/normalize';

export const setClients = (clients) => ({
    type: SET_CLIENTS,
    payload: { clients }
});

export const createClient = (client) => ({
    type: CREATE_CLIENT,
    payload: {
        [client.objectId]: { ...client }
    }
});

export const fetchClients = () => {
    return async (dispatch) => {
        try {
            dispatch(startGlobalLoading());
            const data = await Get('/api/show-clients');
            // create plaint object
            const clients = normalize('clients', data);
            dispatch(setClients(clients));
            dispatch(endGlobalLoading());
        } catch (e) {
            console.log(e);
        }
    };
};

// params means: { name, address, telephone, mobilephone, note }
export const addClient = (params) => {
    return async (dispatch) => {
        try {
            const data = await Post('/api/create-client', params);
            dispatch(createClient({
                ...params,
                objectId: data.id
            }));
        } catch (e) {
            console.log(e);
        }
    };
};
