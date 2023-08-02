import React from "react";
import ErrorImage from '../images/404-image.svg'

const ErrorPage = () => {
  return (
  <div className="text-center">
    <img alt="Страница не найдена" className="img-fluid h-25" src={ErrorImage} />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">Но вы можете перейти <a href="/">на главную страницу</a></p>
  </div>
  )
}

export default ErrorPage;