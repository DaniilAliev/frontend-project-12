import React from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames'

const signupSchema = Yup.object().shape({
    username: Yup.string().min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов').required('Обязательное поле'),
    password: Yup.string().min(6, 'Не менее 6 символов').required('Обязательное поле'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Пароли должны совпадать')
})

const SignupForm = () => {
    const classNames = (errors, touched, formName) => cn('form-control', {
        'is-invalid': errors[formName] && touched[formName]
    })

    return (
        <Formik 
        initialValues={{ username: "", password: "", confirmPassword: "" }} 
        validationSchema={signupSchema}
        onSubmit={( values, { setSubmitting }) => {
            console.log("Form is validated! Submitting the form...");
            setSubmitting(false);
          }}
        >
          {({errors, touched}) => (
            <Form className="w-50">
              <h1 className="text-center mb-4">Регистрация</h1>
              <div className="form-floating mb-3">
                <Field type="text" name="username" required id="username" placeholder="От 3 до 20 символов" className={classNames(errors, touched, "username")} autoComplete="username"/>
                <label htmlFor="username">Имя пользователя</label>
                {errors.username && touched.username ? (
                    <div placement="right" className="invalid-tooltip">{errors.username}</div>
                ) : null}
              </div>
              <div className="form-floating mb-3">
                <Field type="password" name="password" aria-describedby="passwordHelpBlock" required id="password" placeholder="Не менее 6 символов" className={classNames(errors, touched, "password")} autoComplete="new-password"/>
                <label className="form-label" htmlFor="password">Пароль</label>
                {errors.password && touched.password ? (
                    <div placement="right" className="invalid-tooltip">{errors.password}</div>
                ) : null}
              </div>
              <div className="form-floating mb-4">
                <Field type="password" name="confirmPassword" aria-describedby="passwordHelpBlock" required id="confirmPassword" placeholder="Пароли должны совпадать" className={classNames(errors, touched, "confirmPassword")} autoComplete="new-password"/>
                <label className="form-label" htmlFor="confirmPassword">Подтвердите пароль</label>
                {errors.confirmPassword && touched.confirmPassword ? (
                    <div placement="right" className="invalid-tooltip">{errors.confirmPassword}</div>
                ) : null}
              </div>
              <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Зарегистрироваться</button>
            </Form>
          )}
        </Formik>
    )
}

export default SignupForm;