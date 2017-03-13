/**
 * @file   搜索框
 * @author SidKwok
 */
import {
    EDIT_SEARCH,
    CLEAR_SEARCH,
    FOCUS_SEARCH,
    BLUR_SEARCH
} from '../constants/ActionTypes';

const initialState = {
    str: '',
    isFocus: false
};

export default function status(state = initialState, { type, payload }) {
    switch (type) {
        case EDIT_SEARCH:
            return {
                ...state,
                str: payload.str
            };
        case CLEAR_SEARCH:
            return {
                ...state,
                str: ''
            };
        case FOCUS_SEARCH:
            return {
                ...state,
                isFocus: true
            };
        case BLUR_SEARCH:
            return {
                ...state,
                isFocus: false
            };
        default:
            return state;
    }
}
