import React from 'react';
import { connect } from 'react-redux';
import { browserHistory as history } from 'react-router';

import './HeaderContent.less';

const mapStateToProps = (state) => ({
    router: state.routing
});

const HeaderContent = props => {
    const { pathname } = history.getCurrentLocation();
    console.log(pathname);
    return (
        <div className='header-content'>
            <h1>仓库</h1>
        </div>
    );
};

export default connect(mapStateToProps)(HeaderContent);
