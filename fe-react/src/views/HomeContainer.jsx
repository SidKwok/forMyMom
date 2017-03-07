import React, {Component} from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import 'hamburgers/dist/hamburgers.css';
import './HomeContainer.less';

import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;

export default class HomeContainer extends Component {
    state = {
        collapsed: false
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    render() {
        const { collapsed } = this.state;
        const logo = classNames([
            'logo',
            collapsed ? 'collapsed-logo' : 'normal-logo'
        ]);
        const foldType = classNames(collapsed ? 'menu-unfold' : 'menu-fold');
        return (
            <Layout className='home-container'>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}>
                    <div className='title'>
                        <p style={{display: collapsed ? 'none' : 'block'}}>mingyou</p>
                        <div className='collapse' onClick={this.toggle}>
                            <Icon type={foldType}
                                className='collapse-logo' />
                        </div>
                    </div>
                    <div className={logo}>
                        <div className='img' />
                    </div>
                    <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
                        <Menu.Item key='1'>
                            <Link to='/warehouse'>
                                <Icon type='home' />
                                <span className='nav-text'>仓库</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key='2'>
                            <Link to='/client'>
                                <Icon type='team' />
                                <span className='nav-text'>客户</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key='3'>
                            <Link to='/vender'>
                                <Icon type='solution' />
                                <span className='nav-text'>厂家</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key='4'>
                            <Link to='/analysis'>
                                <Icon type='line-chart' />
                                <span className='nav-text'>深度分析</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        {'asd'}
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
