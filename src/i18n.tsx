import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEnglish from "./Translations/en.json"
import translationSpanish from "./Translations/es.json"
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: {
                translation: translationEnglish
            },
            es: {
                translation: translationSpanish
            }
        },
        lng: 'en', // if you're using a language detector, do not define the lng option
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
    });
i18n.changeLanguage(navigator.language);
