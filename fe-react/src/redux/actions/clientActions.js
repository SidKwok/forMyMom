import {
    SET_CLIENTS
} from '../constants/ActionTypes';
import { Get } from 'utils/api';
import normalize from 'utils/normalize';

// import { normalize, schema } from 'normalizr';

export const setClients = (clients) => ({
    type: SET_CLIENTS,
    payload: { clients }
});

export const fetchClients = () => {
    return async (dispatch) => {
        try {
            const data = await Get('/api/show-clients');
            // create plaint object
            const clients = normalize('clients', data);
            dispatch(setClients(clients));
        } catch (e) {
            console.log(e);
        }
    };
};
