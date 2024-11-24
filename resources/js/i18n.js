import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from 'i18next-http-backend';


i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(Backend)
    .use(LanguageDetector)
    .init({
        debug: false,
        // lng: 'en',
        fallbackLng: "en",
        defaultNS: "common",
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        load: "languageOnly", // exclude language codes [en-US] -> en
        detection: {
            order: ["cookie", "htmlTag"],
            lookupCookie: "lang",
            caches: ["cookie"],
            cookieOptions: { path: '/', sameSite: 'strict' },
            cookieMinutes: 60*24*30,
            htmlTag: document.documentElement,
        },
        backend: {
            // for weblate: '/lang/Weblate/common/*.json
            // for weblate: '/lang/Weblate/admin/*.json
            loadPath: '/lang/Weblate/{{ns}}/{{lng}}.json'
        },
    });

export default i18n;
