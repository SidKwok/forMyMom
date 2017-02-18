import React from 'react';
import './Hello.css';
import axios from 'axios';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: 'Hello World!'
        };
    }
    handleClick = () => {
        axios.get('/api')
            .then(res => res.data)
            .then(ret => {
                console.log(ret);
            });
    }
    render() {
        return (
            <div id='Hello'>
                <div className='msg'>{this.state.msg}</div>
                <button
                    onClick={this.handleClick}>test</button>
            </div>
        );
    }
}
