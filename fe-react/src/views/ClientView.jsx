import React, { Component } from 'react';

export default class ClientView extends Component {
    constructor(props) {
        super(props);
        this.state = { name: 'client' };
    }

    render() {
        return (
            <p>I'm {this.state.name}.</p>
        );
    }
}
