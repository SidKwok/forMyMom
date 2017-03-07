import React, { Component } from 'react';

export default class VenderView extends Component {
    constructor(props) {
        super(props);
        this.state = { name: 'Vender' };
    }

    render() {
        return (
            <p>I'm {this.state.name}.</p>
        );
    }
}
