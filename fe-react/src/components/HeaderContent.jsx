import React from 'react';
import { connect } from 'react-redux';
import { browserHistory as history } from 'react-router';

const mapStateToProps = (state) => ({
    router: state.routing
});

const HeaderContent = props => {
    const { pathname } = history.getCurrentLocation();
    return (
        <div>{pathname}</div>
    );
};

export default connect(mapStateToProps)(HeaderContent);
