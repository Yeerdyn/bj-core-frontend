import React, {SyntheticEvent} from "react";
import {Button, Form, Icon, Input} from "antd";
import {WrappedFormUtils} from "antd/lib/form/Form";

interface ISigninFormProps {
  onSubmit?: (values: object) => void;
  form: WrappedFormUtils
}

class SigninForm extends React.Component<ISigninFormProps> {
  handleSubmit = (e: SyntheticEvent) => {
    const { form: { validateFields }, onSubmit } = this.props;

    e.preventDefault();

    validateFields((err, values) => {
      if (!err) {
        onSubmit && onSubmit(values);
      }
    });
  };

  render() {
    const { form: { getFieldDecorator }} = this.props;

    return (
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
    )
  }
}

const WrappedSigninForm = Form.create({ name: 'signin-form' })(SigninForm);

export default WrappedSigninForm;
