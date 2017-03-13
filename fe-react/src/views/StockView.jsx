import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ search }) => ({
    searchStr: search.str
});

class StockView extends Component {
    render() {
        return (
            <p>{this.props.searchStr}</p>
        );
    }
}

export default connect(mapStateToProps)(StockView);
