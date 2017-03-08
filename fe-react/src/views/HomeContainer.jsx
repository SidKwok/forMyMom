import React, {Component} from 'react';
import { Link, browserHistory as history } from 'react-router';
import HeaderContent from 'components/HeaderContent';
import classNames from 'classnames';
import 'hamburgers/dist/hamburgers.css';
import './HomeContainer.less';

import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;

import { routes } from 'router/routes';

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
        const { pathname } = history.getCurrentLocation();
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
                    <Menu theme='dark' mode='inline' defaultSelectedKeys={[pathname]}>
                        <Menu.Item key={routes.STOCK}>
                            <Link to={routes.STOCK}>
                                <Icon type='home' />
                                <span className='nav-text'>仓库</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={routes.CLIENT_ALL}>
                            <Link to={routes.CLIENT_ALL}>
                                <Icon type='team' />
                                <span className='nav-text'>客户</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={routes.VENDER_ALL}>
                            <Link to={routes.VENDER_ALL}>
                                <Icon type='solution' />
                                <span className='nav-text'>厂家</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={routes.DELIVERY}>
                            <Link to={routes.DELIVERY}>
                                <Icon type='paper-clip' />
                                <span className='nav-text'>出货单</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={routes.PURCHASE}>
                            <Link to={routes.PURCHASE}>
                                <Icon type='inbox' />
                                <span className='nav-text'>出货单</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={routes.ANALYSIS}>
                            <Link to={routes.ANALYSIS}>
                                <Icon type='line-chart' />
                                <span className='nav-text'>深度分析</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <HeaderContent />
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
