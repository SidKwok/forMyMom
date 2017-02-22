import React, { Component } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import './TestView.less';

export default class TestView extends Component {
    /**
     * 登陆
     * @param username {string} 用户名
     * @param password {string} 密码
     */
    logIn = () => {
        axios.post('/auth/login', {
            username: 'test',
            password: '12345678'
        })
        .then(({ data }) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    /**
     * 登出
     */
    logOut = () => {
        axios.post(
            '/auth/logout'
        )
        .then(({ data }) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    /**
     * 添加鞋子
     * @param shoeId {string} 型号
     * @param brand {string} 品牌
     * @param color {string} 颜色
     * @param sizes {object} 尺码
     */
    createShoe = () => {
        axios.post('/api/create-shoe', {
            shoeId: '1101',
            brand: 'nike',
            color: 'red',
            sizes: {
                s34: 1,
                s35: 1,
                s36: 1,
                s37: 1,
                s38: 1,
                s39: 1,
                s40: 1,
                s41: 1,
                s42: 1,
                s43: 1,
                s44: 1
            }
        })
        .then(({ data }) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    render() {
        return (
            <div className='test-view'>
                <Button onClick={this.logIn}>Log In</Button>
                <Button onClick={this.logOut}>Log Out</Button>
                <Button onClick={this.createShoe}>Create Shoe</Button>
            </div>
        );
    }
}
