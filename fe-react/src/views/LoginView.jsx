import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import * as actions from '$redux/actions';
// import axios from 'axios';
import './LoginView.less';

const mapStateToProps = state => ({
    isLogin: state.status.isLogin
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form.create()(class LoginView extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.actions.login();
        // axios.post('/auth/login', {
        //     username: this.props.form.getFieldValue('username'),
        //     password: this.props.form.getFieldValue('password')
        // })
        // .then(({data}) => {
        //     console.log(data);
        // });
    }
    handleClick = e => {
        e.preventDefault();
        this.props.actions.logout();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login-view'>
                <div style={{
                    width: '500px',
                    height: '500px',
                    margin: '60px auto'
                }}>
                    <p>{this.props.isLogin ? 'login' : 'logout'}</p>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator('username')(
                                <Input placeholder='username' />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password')(
                                <Input placeholder='password' type='password' />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit'>Log In</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={this.handleClick}>Log Out</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}));
