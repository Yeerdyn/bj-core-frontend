import React, { SyntheticEvent } from 'react';
import { Button, Form, Input } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { API } from 'src/api';
import {ICreateItemParams} from "src/api/types";

interface ICreateItemFormProps {
  onSubmit: (values: ICreateItemParams) => void;
  form: WrappedFormUtils;
}

interface ICreateItemFormState {
  loading: boolean;
}

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}

class CreateItemForm extends React.Component<
  ICreateItemFormProps,
  ICreateItemFormState
> {
  state = {
    loading: false,
  };

  componentDidMount(): void {
    this.props.form.validateFields();
  }

  handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    this.submit();
  };

  submit() {
    const {
      form: { validateFields }
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        this.createItem(values);
      }
    });
  }

  handleKeyPress = (e: React.KeyboardEvent<any>) => {
    e.key === 'Enter' && this.submit();
  };

  async createItem(params: ICreateItemParams) {
    const { onSubmit, form: { resetFields } } = this.props;
    this.setState({ loading: true });

    try {
      await API.methods.items.create(params);
      onSubmit && onSubmit(params);
      resetFields();
    } catch (e) {
      // Do nothing
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const {
      getFieldDecorator,
      isFieldTouched,
      isFieldsTouched,
      getFieldError,
      getFieldsError,
    } = this.props.form;
    const { loading } = this.state;
    const usernameError =
      isFieldTouched('username') && getFieldError('username');
    const emailError = isFieldTouched('email') && getFieldError('email');
    const textError = isFieldTouched('text') && getFieldError('text');
    const submitDisabled =
      !isFieldsTouched(['username', 'email', 'text']) ||
      hasErrors(getFieldsError());

    return (
      <Form onSubmit={this.handleSubmit} className="create-form" onKeyPress={this.handleKeyPress}>
        <Form.Item
          validateStatus={usernameError ? 'error' : ''}
          help={usernameError || ''}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(<Input placeholder="Username" />)}
        </Form.Item>
        <Form.Item
          validateStatus={emailError ? 'error' : ''}
          help={emailError || ''}>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'Please enter a valid E-mail!',
              },
              { required: true, message: 'Please input your email!' },
            ],
          })(<Input type="email" placeholder="email" />)}
        </Form.Item>
        <Form.Item
          validateStatus={textError ? 'error' : ''}
          help={textError || ''}>
          {getFieldDecorator('text', {
            rules: [{ required: true, message: 'Please input your text!' }],
          })(<Input type="text" placeholder="text" />)}
        </Form.Item>
        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="login-form-button"
            disabled={submitDisabled}>
            Create item
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedCreateItemForm = Form.create<ICreateItemFormProps>({
  name: 'crete-item-form',
})(CreateItemForm);

export default WrappedCreateItemForm;
