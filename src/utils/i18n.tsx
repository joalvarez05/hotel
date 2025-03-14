import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import global_es from "@/translation/es/global.json";
import global_en from "@/translation/en/global.json";

const savedLanguage = localStorage.getItem("language") || "es";

i18n.use(initReactI18next).init({
  resources: {
    es: {
      global: global_es,
    },
    en: {
      global: global_en,
    },
  },
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
