import React, { useState } from "react";
import { Formik, Form, Field } from 'formik';
import axios from 'axios'
import { useAuth } from "../context";
import { useNavigate } from "react-router-dom";
import cn from 'classnames';


const LoginForm = () => {
  const [invalidState, setInvalidState] = useState(false)
  const navigate = useNavigate();
  const { logIn } = useAuth()
  const classNames = cn('form-control', {
    'is-invalid': invalidState
  });

  return (
    <Formik
    initialValues={{ username: "", password: "" }}
    onSubmit={async ( values, { setSubmitting }) => {
      try {
        const response = await axios.post('/api/v1/login', { username: values.username, password: values.password })
        if (response.data.token) {
          logIn(response.data);
          navigate('/');
        }}
        catch (error) {
          setSubmitting(false);
          if (error.response?.status === 401) {
            error.authentification = true;
            setInvalidState(true)
          }
      }
    }}>
      {() => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">Войти</h1>
          <div className="form-floating mb-3">
            <Field type="text" name="username" required id="username" placeholder="Ваш ник" className={classNames}/>
            <label htmlFor="username">Ваш ник</label>
          </div>
          <div className="form-floating mb-4">
            <Field type="password" name="password" required id="password" placeholder="Ваш ник" className={classNames}/>
            <label className="form-label" htmlFor="password">Пароль</label>
            {invalidState ? (
                    <div placement="right" className="invalid-tooltip">Неверные имя пользователя или пароль</div>
                ) : null}
          </div>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm;