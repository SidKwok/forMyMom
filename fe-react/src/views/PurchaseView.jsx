import React, { Component } from 'react';

export default class PurchaseView extends Component {
    constructor(props) {
        super(props);
        this.state = { name: 'Purchase' };
    }

    render() {
        return (
            <p>I'm {this.state.name}.</p>
        );
    }
}
