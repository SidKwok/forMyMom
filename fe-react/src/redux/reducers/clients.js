/**
 * @file   客户模块
 * @author SidKwok
 */
import {
    SET_CLIENTS,
    CREATE_CLIENT
} from '../constants/ActionTypes';

/**
 * should be a plaint object like:
 * {
 *    'clientObjectId1': { data1: 'data', data2: 'data' }
 *    'clientObjectId2': { data1: 'data', data2: 'data' }
 * }
 *
 */
const initialState = {};

export default function status(state = initialState, { type, payload }) {
    switch (type) {
        case SET_CLIENTS:
            // it is ok to cover the original data
            // for it is use for initing and recover
            const clients = payload.clients ? payload.clients : {};
            return clients;
        case CREATE_CLIENT:
            return { ...state, payload };
        default:
            return state;
    }
}
