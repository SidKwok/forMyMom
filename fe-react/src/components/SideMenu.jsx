import React, { Component } from 'react';

import { Menu, Icon, Layout } from 'antd';
const Sider = Layout.Sider;

export default class SideMenu extends Component {
    state = {
        isSpread: true
    }
    toggle = () => {
        this.setState({
            isSpread: !this.state.isSpread
        });
    }
    render() {
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}>
                <div className='logo' />
                <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
                    <Menu.Item key='1'>
                        <Icon type='user' />
                        <span className='nav-text'>仓库</span>
                    </Menu.Item>
                    <Menu.Item key='2'>
                        <Icon type='video-camera' />
                        <span className='nav-text'>客户</span>
                    </Menu.Item>
                    <Menu.Item key='3'>
                        <Icon type='upload' />
                        <span className='nav-text'>厂家</span>
                    </Menu.Item>
                    <Menu.Item key='4'>
                        <Icon type='upload' />
                        <span className='nav-text'>出货单</span>
                    </Menu.Item>
                    <Menu.Item key='5'>
                        <Icon type='upload' />
                        <span className='nav-text'>进货单</span>
                    </Menu.Item>
                    <Menu.Item key='6'>
                        <Icon type='upload' />
                        <span className='nav-text'>深度分析</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}
