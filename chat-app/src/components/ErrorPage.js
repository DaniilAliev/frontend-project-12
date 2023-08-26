import React from "react";
import ErrorImage from '../images/404-image.svg';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ErrorPage = () => {
  const { t } = useTranslation();


  return (
  <div className="text-center">
    <img alt={t('errorPage.notFound')} className="img-fluid h-25" src={ErrorImage} />
    <h1 className="h4 text-muted">{t('errorPage.notFound')}</h1>
    <p className="text-muted">{t('errorPage.butYouCanGoTo')}<Link to="/">{t('errorPage.toHomePage')}</Link></p>
  </div>
  )
}

export default ErrorPage;