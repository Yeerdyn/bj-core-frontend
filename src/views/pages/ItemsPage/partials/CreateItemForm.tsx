import React, {SyntheticEvent} from "react";
import {Button, Form, Input} from "antd";
import {WrappedFormUtils} from "antd/lib/form/Form";

interface ICreateItemFormProps {
  onSubmit?: (values: object) => void;
  form: WrappedFormUtils
}

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class CreateItemForm extends React.Component<ICreateItemFormProps> {
  componentDidMount(): void {
    this.props.form.validateFields();
  }

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
    const { getFieldDecorator, isFieldTouched, isFieldsTouched, getFieldError, getFieldsError } = this.props.form;
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const emailError = isFieldTouched('email') && getFieldError('email');
    const textError = isFieldTouched('text') && getFieldError('text');
    const submitDisabled = !isFieldsTouched(['username', 'email', 'text']) || hasErrors(getFieldsError())

    return (
      <Form onSubmit={this.handleSubmit} className="create-form">
        <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              placeholder="Username"
            />,
          )}
        </Form.Item >
        <Form.Item validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
          {getFieldDecorator('email', {
            rules: [
              {
                type: "email",
                message: "Please enter a valid E-mail!"
              },
              { required: true, message: 'Please input your email!' }
              ],
          })(
            <Input
              type="email"
              placeholder="email"
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={textError ? 'error' : ''} help={textError || ''}>
          {getFieldDecorator('text', {
            rules: [
              { required: true, message: 'Please input your text!' }
            ],
          })(
            <Input
              type="text"
              placeholder="text"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            disabled={submitDisabled}
          >
            Create item
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedCreateItemForm = Form.create({ name: 'crete-item-form' })(CreateItemForm);

export default WrappedCreateItemForm;
