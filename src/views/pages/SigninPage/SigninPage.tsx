import React from 'react';
import SigninForm from './partials/SigninForm';
import bemClassNames from '../../../utilities/bemClassNames';

interface ISigninPageProps {}

const b = bemClassNames('signin-page');

const SigninPage: React.FC<ISigninPageProps> = () => (
  <div className={b()}>
    <SigninForm />
  </div>
);

export default SigninPage;
