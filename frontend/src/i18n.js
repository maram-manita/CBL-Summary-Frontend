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
    fallbackLng: "en",
    load: "languageOnly",
    detection: {
      order: ["localStorage", "cookie", "navigator"],
      caches: ["localStorage", "cookie"],
      checkWhitelist: true,
      lookupLocalStorage: "i18nextLng",
      lookupCookie: "i18nextLng",
    },
    whitelist: ["en", "ar"],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
