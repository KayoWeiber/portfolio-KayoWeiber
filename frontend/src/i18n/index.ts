import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ptBR from './ptBR.json';
import enUS from './enUS.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      'pt-BR': { translation: ptBR },
      'en-US': { translation: enUS }
    },
    lng: 'pt-BR', // idioma padrão
    fallbackLng: 'pt-BR',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
