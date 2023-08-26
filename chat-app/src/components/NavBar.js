import React from "react";
import { useAuth } from "../context";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const { t } = useTranslation();
  
  const { user, logOut } = useAuth();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{t('navBar.hexletChat')}</a>
        {user && <button onClick={logOut} type="button" className="btn btn-primary">{t('navBar.logOut')}</button>}
      </div>
    </nav>
  )
}

export default NavBar;