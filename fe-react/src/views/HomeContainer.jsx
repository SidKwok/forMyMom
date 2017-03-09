import React, { Component } from 'react';
import './HomeContainer.less';

export default class HomeContainer extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
