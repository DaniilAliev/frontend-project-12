import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoginImage from '../images/login-image.jpeg';
import SignUpImage from '../images/signup-image.jpg';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const CardFooter = () => {
  const { t } = useTranslation();

  return (
    <div className="card-footer p-4">
      <div className="text-center">
        <span>{t('login.noAcc')}</span>
        <Link to="/signup">{t('signup.signupText')}</Link>
      </div>
    </div>
  );
};

const Login = ({ type }) => {
  const loginClasses = 'row';
  const signupClasses = 'd-flex flex-column flex-md-row justify-content-around align-items-center';
  const className = cn('card-body', 'p-5', {
    [loginClasses]: type === 'login',
    [signupClasses]: type === 'signup',
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className={className}>
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={type === 'login' ? LoginImage : SignUpImage} alt={type === 'login' ? 'Войти' : 'Регистрация'} className="rounded-circle" />
              </div>
              { type === 'login' ? <LoginForm /> : <SignupForm />}
            </div>
            {type === 'login' && <CardFooter />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
