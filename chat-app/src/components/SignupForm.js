import React, {useState} from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import { useTranslation } from "react-i18next";



const SignupForm = () => {
  const { t } = useTranslation();

  const signupSchema = Yup.object().shape({
    username: Yup.string().min(3, `${t('errors.usernameSymbols')}`).max(20, `${t('errors.usernameSymbols')}`).required(`${t('errors.reqired')}`),
    password: Yup.string().min(6, `${t('errors.passwordSymbols')}`).required(`${t('errors.reqired')}`),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], `${t('errors.confirmPassword')}`)
  })

  const [isUserExist, setUserExistance] = useState(null)

    const navigate = useNavigate();
    const { logIn } = useAuth()

    const classNames = (errors, touched, formName) => cn('form-control', {
        'is-invalid': (errors[formName] && touched[formName]) || isUserExist
    })

    return (
        <Formik 
        initialValues={{ username: "", password: "", confirmPassword: "" }} 
        validationSchema={signupSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={async ( values ) => {
            try {const response = await axios.post('/api/v1/signup', { username: values.username, password: values.password })
            logIn(response.data);
            navigate('/');
            setUserExistance(false);
          } catch (error) {
            if (error.response?.status === 409) {
              error.authentification = true;
              setUserExistance(true);
            } else if (error.response?.status === 500) {
              console.log('500')
              toast.error(`${t('errors.networkError')}`);
            }
             else {
              setUserExistance(false)
            }
          }
          }}
        >
          {({errors, touched}) => (
            <Form className="w-50">
              <h1 className="text-center mb-4">{t('signup.signupText')}</h1>
              <div className="form-floating mb-3">
                <Field type="text" name="username" required id="username" placeholder={t('errors.usernameSymbols')} className={classNames(errors, touched, "username")} autoComplete="username"/>
                <label htmlFor="username">{t('signup.loginPlaceholder')}</label>
                {(errors.username && touched.username) ? (
                    <div placement="right" className="invalid-tooltip">{errors.username}</div>
                ) : (isUserExist ? <div placement="right" className="invalid-tooltip"></div> : null)}
              </div>
              <div className="form-floating mb-3">
                <Field type="password" name="password" aria-describedby="passwordHelpBlock" required id="password" placeholder={t('errors.passwordSymbols')} className={classNames(errors, touched, "password")} autoComplete="new-password"/>
                <label className="form-label" htmlFor="password">{t('signup.passwordPlaceholder')}</label>
                {errors.password && touched.password ? (
                    <div placement="right" className="invalid-tooltip">{errors.password}</div>
                ) : (isUserExist ? <div placement="right" className="invalid-tooltip"></div> : null)}
              </div>
              <div className="form-floating mb-4">
                <Field type="password" name="confirmPassword" aria-describedby="passwordHelpBlock" required id="confirmPassword" placeholder={t('errors.confirmPassword')} className={classNames(errors, touched, "confirmPassword")} autoComplete="new-password"/>
                <label className="form-label" htmlFor="confirmPassword">{t('signup.confirmPasswordPlaceholder')}</label>
                {errors.confirmPassword && touched.confirmPassword ? (
                    <div placement="right" className="invalid-tooltip">{errors.confirmPassword}</div>
                ) : (isUserExist ? <div placement="right" className="invalid-tooltip">{t('errors.userAlreadyExisit')}</div> : null )}
              </div>
              <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('signup.submit')}</button>
            </Form>
          )}
        </Formik>
    )
}

export default SignupForm;