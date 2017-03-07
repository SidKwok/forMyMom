import React, { Component } from 'react';

export default class DeliveryView extends Component {
    constructor(props) {
        super(props);
        this.state = { name: 'Delivery' };
    }

    render() {
        return (
            <p>I'm {this.state.name}.</p>
        );
    }
}
