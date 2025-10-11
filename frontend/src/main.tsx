import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n'; // Importante: importa a configuração do i18n
import { useEffect } from 'react';
import i18n from './i18n';

export function HtmlLangSync() {
  useEffect(() => {
    const updateLang = () => {
      document.documentElement.lang = i18n.resolvedLanguage || 'pt-BR';
    };
    updateLang();
    i18n.on('languageChanged', updateLang);
    return () => {
      i18n.off('languageChanged', updateLang);
    };
  }, []);
  return null;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <>
      <HtmlLangSync />
      <App />
    </>
  </React.StrictMode>
);
