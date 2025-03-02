import i18n from 'i18next';

i18n.init({
  resources: {
    en: {
      translation: {
        welcome: 'Welcome to Currency Converter'
      }
    },
    fa: {
      translation: {
        welcome: 'به مبدل ارز خوش آمدید'
      }
    }
  },
  lng: 'en',
  fallbackLng: 'en',
});
