import React, { Component } from 'react';

export default class VenderAllView extends Component {
    constructor(props) {
        super(props);
        this.state = { name: 'VenderAll' };
    }

    render() {
        return (
            <p>I'm {this.state.name}.</p>
        );
    }
}
