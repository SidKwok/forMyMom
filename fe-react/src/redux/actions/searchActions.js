import {
    EDIT_SEARCH,
    CLEAR_SEARCH,
    FOCUS_SEARCH,
    BLUR_SEARCH
} from '../constants/ActionTypes';

export const onSearchChange = (str) => ({
    type: EDIT_SEARCH,
    payload: { str }
});

export const clearSearch = () => ({ type: CLEAR_SEARCH });

export const onSearchFocus = () => ({ type: FOCUS_SEARCH });

export const onSearchBlur = () => ({ type: BLUR_SEARCH });
