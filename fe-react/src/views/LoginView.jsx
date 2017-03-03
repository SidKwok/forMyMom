import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import './LoginView.less';

export default Form.create()(class LoginView extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/auth/login', {
            username: this.props.form.getFieldValue('username'),
            password: this.props.form.getFieldValue('password')
        })
        .then(({data}) => {
            console.log(data);
        });
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
});
