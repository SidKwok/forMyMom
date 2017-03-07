import React, { Component } from 'react';

export default class AnalysisView extends Component {
    constructor(props) {
        super(props);
        this.state = { name: 'Analysis' };
    }

    render() {
        return (
            <p>I'm {this.state.name}.</p>
        );
    }
}
