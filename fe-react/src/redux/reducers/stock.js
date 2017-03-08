/**
 * @file   库存处理
 * @author SidKwok
 */
import {
    GET_STOCK
} from '../constants/ActionTypes';

const initialState = {
    stock: []
};

export default function status(state = initialState, { type, payload }) {
    switch (type) {
        case GET_STOCK:
            return {
                ...state,
                stock: payload.stock
            };
        default:
            return state;
    }
}
