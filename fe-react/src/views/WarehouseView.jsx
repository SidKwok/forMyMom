import React, { Component } from 'react';

export default class WarehouseView extends Component {
    constructor(props) {
        super(props);
        this.state = { name: 'Warehouse' };
    }

    render() {
        return (
            <p>I'm {this.state.name}.</p>
        );
    }
}
