import React, {Component} from 'react';
import { Link } from 'react-router';
import { Button } from 'antd';
import './MainView.css';

import axios from 'axios';

export default class FooView extends Component {
    handleClick = () => {
        axios.get('/api')
            .then(res => res.data)
            .then((ret) => {
                console.log(ret);
            });
    }
    render() {
        return (
            <div className='main-view'>
                <div className='btn-group'>
                    <Link to='/foo' className='btn' activeClassName='active'>To Foo</Link>
                    <Link to='/bar' className='btn' activeClassName='active'>To Bar</Link>
                </div>
                <Button onClick={this.handleClick}>test</Button>
                <div className='view'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
