import React, { Component } from 'react';

export default class ClientAllView extends Component {
    constructor(props) {
        super(props);
        this.state = { name: 'ClientAllView' };
    }
    render() {
        return (
            <p>I'm {this.state.name}.</p>
        );
    }
}
