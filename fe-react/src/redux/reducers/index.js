import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import status from './status';
import stock from './stock';
import search from './search';
import clients from './clients';

export default combineReducers({
    status,
    stock,
    search,
    clients,
    routing: routerReducer
});
