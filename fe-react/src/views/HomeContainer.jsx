import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routes } from 'router/routes';
import { Layout, Icon, Row, Col } from 'antd';
import NavLink from 'components/NavLink';
import Title from 'components/Title';
import SearchBlock from 'components/SearchBlock';
// import OperationBlock from 'components/OperationBlock';
import GlobalSpin from 'components/GlobalSpin';
import './HomeContainer.less';

const { Header, Content, Sider } = Layout;

const mapStateToProps = ({ loading }) => ({ loading: loading.global });

class HomeContainer extends Component {
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
        const { loading } = this.props;
        return (
            <Layout className='home-container'>
                <Sider
                    className='sider'
                    trigger={null}
                    collapsible
                    collapsed={collapsed}>
                    <p className='logo'>LOGO</p>
                    <ul>
                        <NavLink type='home'
                            to={routes.STOCK}
                            name='仓库'
                            isCollapsed={collapsed}
                        />
                        <NavLink type='contacts'
                            to={routes.CLIENT_ALL}
                            name='客户'
                            isCollapsed={collapsed}
                        />
                        <NavLink type='team'
                            to={routes.VENDER_ALL}
                            name='厂家'
                            isCollapsed={collapsed}
                        />
                        <NavLink type='paper-clip'
                            to={routes.DELIVERY}
                            name='出货单'
                            isCollapsed={collapsed}
                        />
                        <NavLink type='shop'
                            to={routes.PURCHASE}
                            name='进货单'
                            isCollapsed={collapsed}
                        />
                        <NavLink type='line-chart'
                            to={routes.ANALYSIS}
                            name='深度分析'
                            isCollapsed={collapsed}
                        />
                    </ul>
                </Sider>
                <Layout style={{position: 'relative'}}>
                    <GlobalSpin loading={loading} />
                    <Header className='header'>
                        <Row>
                            <Col span={2}>
                                <Icon
                                    type='bars'
                                    className='collapse'
                                    onClick={this.toggle}
                                />
                            </Col>
                            <Col span={6}>
                                <Title />
                            </Col>
                            <Col span={16} className='search-block'>
                                <SearchBlock />
                            </Col>
                        </Row>
                    </Header>
                    <Content className='content'>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default connect(mapStateToProps)(HomeContainer);
