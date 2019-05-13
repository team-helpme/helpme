
import React from 'react';
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Typography, notification
} from 'antd';
import 'antd/dist/antd.css';
import './Authentication.css';
import Router from 'next/router';
import ForgotPassword from '../../../static/forgot_password.svg';

const { Title, Paragraph } = Typography;

/**
 *  function that is used to display the registration Page
 *
 * @function
 * @return {Object} the registtration  page
 */
class ForgetPasswordForm extends React.Component {
    state = {
        loading: false,
        iconLoading: false,
    };

    enterLoading = () => {
        this.setState({ loading: true });
    }

    handleSubmit = e => {
        e.preventDefault();
        // This function  after validation, if the target field is not in visible area of form, form will be automatically scrolled to the target field area.
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                setTimeout(() => {
                    this.setState({ loading: false, values });
                    this.openNotificationWithIcon('success', values.email);
                }, 1000);
                console.log('Received values of form: ', values.email);
            }
        });
    }

    close = () => {
        Router.push('/login');
    };

    openNotificationWithIcon = (type, email) => {
        notification[type]({
            message: 'Link Sent',
            description:
                `The resent link has been sent to ${email}`,
            duration: 0,
            onClose: this.close,
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <section className="password-Section">
                <section className="password-image-section">
                    <ForgotPassword className="password-image" />
                </section>

                <section className="password-Form-section">

                    <Form className="password-form" onSubmit={this.handleSubmit}>
                        <Form.Item
                          label="E-mail"
                        >
                            {getFieldDecorator('email', {
                                rules: [{
                                    type: 'email', message: 'The input is not a valid E-mail !',
                                }, {
                                    required: true, message: 'Please input your E-mail so that we can send you!',
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={this.state.loading} onClick={this.enterLoading}>Request for Password Change</Button>
                            <br />
                            remember your password?
                            {' '}
                            <a className="password-form-register" href="/login">login</a>
                        </Form.Item>
                    </Form>
                </section>
            </section>
        );
    }
}

const ForgetPassword = Form.create({ name: 'register' })(ForgetPasswordForm);

export default ForgetPassword;
