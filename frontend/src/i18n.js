import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

i18n
  .use(LanguageDetector) // Detects language from browser settings
  .use(initReactI18next) // Passes i18n instance to React
  .init({
    resources: {
      en: {
        translation: en,
      },
      ar: {
        translation: ar,
      },
    },
    fallbackLng: "en", // Default language
    interpolation: {
      escapeValue: false, // React already escapes output
    },
  });

export default i18n;