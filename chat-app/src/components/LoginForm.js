import React from "react";
import { Formik, Form, Field } from 'formik';
import axios from 'axios'

const LoginForm = () => {
  return (
    <Formik
    initialValues={{ username: "", password: "" }}
    onSubmit={async ( values, { setSubmitting }) => {
      console.log(values)
      const response = await axios.get("/api/v1/data")
      console.log(response.data)
    }}>
      {() => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">Войти</h1>
          <div className="form-floating mb-3">
            <Field type="text" name="username" required id="username" placeholder="Ваш ник" className="form-control"/>
            <label htmlFor="username">Ваш ник</label>
          </div>
          <div className="form-floating mb-4">
            <Field type="password" name="password" required id="password" placeholder="Ваш ник" className="form-control"/>
            <label className="form-label" htmlFor="password">Пароль</label>
          </div>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm;