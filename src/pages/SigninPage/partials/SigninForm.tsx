import React, { SyntheticEvent } from 'react';
import { Button, Form, Icon, Input } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { API } from '../../../api';
import { ILoginParams } from '../../../api/types';
import createNotification from '../../../utilities/notificationService';
import {setAPIToken} from "../../../utilities/authOperations";

interface ISigninFormProps {
  onSubmit?: (values: object) => void;
  form: WrappedFormUtils;
}

interface ISigninFormState {
  loading: boolean;
}

class SigninForm extends React.Component<ISigninFormProps, ISigninFormState> {
  state = {
    loading: false,
  };

  handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    this.submit();
  };

  submit() {
    const {
      form: { validateFields },
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        this.login(values);
      }
    });
  }

  async login(params: ILoginParams) {
    const { onSubmit } = this.props;
    this.setState({ loading: true });

    try {
      const response = await API.methods.auth.login(params);

      setAPIToken(response.message.token);
      onSubmit && onSubmit(params);
    } catch (e) {
      createNotification('error', 'Login error', e.message);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { loading } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
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
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedSigninForm = Form.create<ISigninFormProps>({
  name: 'signin-form',
})(SigninForm);

export default WrappedSigninForm;
