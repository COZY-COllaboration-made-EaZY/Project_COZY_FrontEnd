import {Locale} from "@/enum/locale";
import i18n from "@/i18n";
import Cookies from "js-cookie";

export function changeLanguage(lang: Locale) {
    i18n.changeLanguage(lang);
    Cookies.set("i18next", lang, { expires: 365 });
}