import React, {Component} from 'react';
import { Link } from 'react-router';
import './HomeContainer.css';

export default class HomeContainer extends Component {
    render() {
        return (
            <div className='home-container'>
                <div className='btn-group'>
                    <Link to='/client' className='btn' activeClassName='active'>To client</Link>
                    <Link to='/vender' className='btn' activeClassName='active'>To vender</Link>
                </div>
                <div className='view'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
