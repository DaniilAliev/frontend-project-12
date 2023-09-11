import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context';

const LoginForm = () => {
  const { t } = useTranslation();

  const [invalidState, setInvalidState] = useState(false);
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const classNames = cn('form-control', {
    'is-invalid': invalidState,
  });

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await axios.post('/api/v1/login', { username: values.username, password: values.password });
          if (response.data.token) {
            logIn(response.data);
            navigate('/');
          }
        } catch (error) {
          setSubmitting(false);
          if (error.response?.status === 401) {
            error.authentification = true;
            setInvalidState(true);
          }
          if (error.response?.status === 500) {
            console.log('500');
            toast.error(`${t('errors.networkError')}`);
          }
        }
      }}
    >
      {() => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">{t('login.loginText')}</h1>
          <div className="form-floating mb-3">
            <Field type="text" name="username" required id="username" placeholder={t('login.loginPlaceholder')} className={classNames} />
            <label htmlFor="username">{t('login.loginPlaceholder')}</label>
          </div>
          <div className="form-floating mb-4">
            <Field type="password" name="password" required id="password" placeholder={t('login.passwordPlaceholder')} className={classNames} />
            <label className="form-label" htmlFor="password">{t('login.passwordPlaceholder')}</label>
            {invalidState ? (
              <div className="invalid-tooltip">{t('errors.invalid')}</div>
            ) : null}
          </div>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('login.submit')}</button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
