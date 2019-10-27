import React from 'react';
import SigninForm from './partials/SigninForm';
import bemClassNames from '../../utilities/bemClassNames';

interface ISigninPageProps {}

const b = bemClassNames('signin-page');

class SigninPage extends React.Component<ISigninPageProps> {
  handleLogin = () => {};

  render() {
    return (
      <div className={b()}>
        <SigninForm onSubmit={this.handleLogin} />
      </div>
    );
  }
}

export default SigninPage;
