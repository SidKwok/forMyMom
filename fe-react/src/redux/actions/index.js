import * as statusActions from './statusActions';
import * as loadingActions from './loadingActions';
import * as searchActions from './searchActions';

export default {
    ...statusActions,
    ...loadingActions,
    ...searchActions
};
