import * as statusActions from './statusActions';
import * as loadingActions from './loadingActions';
import * as searchActions from './searchActions';
import * as clientActions from './clientActions';

export default {
    ...statusActions,
    ...loadingActions,
    ...searchActions,
    ...clientActions
};
