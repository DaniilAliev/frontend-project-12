import React from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import { useAuthContext } from '../context';
import APP_ROUTES from '../routes/appRoutes';

const NavBar = () => {
  const { t, i18n } = useTranslation();

  const { user, logOut } = useAuthContext();

  const lngs = {
    ru: { nativeName: 'Русский' },
    en: { nativeName: 'English' },
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href={APP_ROUTES.MAIN_PAGE}>{t('navBar.hexletChat')}</a>
        <Dropdown as={ButtonGroup} className="d-flex">
          <Dropdown.Toggle variant="default">{t('navBar.lang')}</Dropdown.Toggle>
          <Dropdown.Menu>
            {Object.keys(lngs)
              .map((lng) => (
                <Dropdown.Item key={lng} onClick={() => i18n.changeLanguage(lng)}>
                  {lngs[lng].nativeName}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
        {user && <button onClick={logOut} type="button" className="btn btn-primary">{t('navBar.logOut')}</button>}
      </div>
    </nav>
  );
};

export default NavBar;
