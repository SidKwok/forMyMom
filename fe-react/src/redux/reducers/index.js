import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import status from './status';
import stock from './stock';

export default combineReducers({
    status,
    stock,
    routing: routerReducer
});
