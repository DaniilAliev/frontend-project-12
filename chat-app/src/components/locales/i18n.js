import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from '.';

const initI18Next = async () => {
  const i18nextInstance = i18n.createInstance();

  i18nextInstance
    .use(initReactI18next)
    .init({
      debug: false,
      lng: 'ru',
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
      resources,
    });
};

export default initI18Next;
