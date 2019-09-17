import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './sign.css'
import $axios from 'axios'
class NormalLoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        console.log(this);
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                $axios.get('http://localhost:3000/user', {
                    params: values
                }).then(res => {
                    if (res.data == true) {
                        this.props.history.push('/index')

                        console.log(this.props.match.url);
                    }
                    // else{

                    // }
                })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (<div className={styles.box}>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
          </Button>
                </Form.Item>
            </Form>
        </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm