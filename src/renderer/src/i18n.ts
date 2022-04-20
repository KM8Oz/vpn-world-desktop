import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  ru: {
    translation: {
      "contactus": "Связаться с нами",
      "termsCondi": "Правила и Условия",
      "connect": "Подключить",
      "disconnect": "Отключить",
      "contact":"https://docs.google.com/forms/d/e/1FAIpQLSd9CbxCZlbu-c1142NsFME-vIo_JoMcYCwwiX5j7nqhQ9Pj5g/viewform",
      "terms":"https://gist.githubusercontent.com/KM8Oz/a0d505e629967c71403f4675e67fbc4a/raw/241bedc4948b49f6997894a5e1d8e06ddf3b8324/VPNWORLDPRIVACY"
    }
  },
  en: {
    translation: {
        "contactus": "Contact Us",
        "termsCondi": "Terms & Conditions",
        "connect": "Connect",
      "disconnect": "Disconnect",
      "contact":"https://docs.google.com/forms/d/e/1FAIpQLSd9CbxCZlbu-c1142NsFME-vIo_JoMcYCwwiX5j7nqhQ9Pj5g/viewform",
      "terms":"https://gist.githubusercontent.com/KM8Oz/a0d505e629967c71403f4675e67fbc4a/raw/241bedc4948b49f6997894a5e1d8e06ddf3b8324/VPNWORLDPRIVACY"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;