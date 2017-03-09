import React, { Component } from 'react';
import { Card, Form, Icon, Input, Button } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '$redux/actions';
import { routes } from 'router/routes';
import './LoginView.less';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        signIn: actions.signIn
    }, dispatch);
};

class LoginView extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const { form, signIn, router } = this.props;
        form.validateFields(async (err, { username, password }) => {
            if (!err) {
                const errNo = await signIn(username, password);
                if (errNo === 0) {
                    router.push(routes.STOCK);
                }
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login-view'>
                <Card className='card'>
                    <h1>Welcome Back</h1>
                    <Form onSubmit={this.handleSubmit} className='form'>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入用户名' }]
                            })(
                                <Input prefix={<Icon type='user' style={{ fontSize: 13 }} />}
                                    placeholder='用户名' />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码' }]
                            })(
                                <Input prefix={<Icon type='lock' style={{ fontSize: 13 }} />}
                                    type='password'
                                    placeholder='密码' />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit' className='login-button'>
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(Form.create()(LoginView));
