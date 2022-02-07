import { app } from "@storybook/vue3";
import vueRouter from "storybook-vue3-router";
import {
  configStore,
  i18n,
  i18nPlugin,
  initializeEnvironment,
  LOCAL_ENV,
} from "@tager/admin-services";

import config from "../src/constants/config.json";
import "../src/assets/css/index.css";
import { AdminUiPlugin } from "../src/plugin";

export const decorators = [vueRouter()];

export const parameters = {
  /**
   * Hide `Docs` tab
   * Reference: {@link https://github.com/storybookjs/storybook/issues/13111#issuecomment-730741560}
   */
  previewTabs: {
    "storybook/docs/panel": { hidden: true },
  },
};

initializeEnvironment({
  accessToken: process.env.STORYBOOK_ACCESS_TOKEN,
  apiUrl: process.env.STORYBOOK_API_URL,
  appEnv: LOCAL_ENV,
});

app.use(AdminUiPlugin);
app.use(i18nPlugin);

configStore.setConfig(config);

i18n.init({ debug: false, lng: "ru" });
