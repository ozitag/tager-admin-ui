import { type Plugin } from "vue";

import { i18n } from "@tager/admin-services";

import EN from "./locales/en";
import RU from "./locales/ru";

export const AdminUiPlugin: Plugin = () => {
  i18n.addTranslations("en", "ui", EN);
  i18n.addTranslations("ru", "ui", RU);
};
