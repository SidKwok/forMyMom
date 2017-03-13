import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import status from './status';
import stock from './stock';
import search from './search';

export default combineReducers({
    status,
    stock,
    search,
    routing: routerReducer
});
