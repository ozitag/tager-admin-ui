import { configStore, i18n, setAccessToken } from '@tager/admin-services';
import '../src/assets/css/index.css';
import EN from '../src/locales/en';
import RU from '../src/locales/ru';
import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';

import config from '../src/constants/config.json';

const accessToken = process.env.VUE_APP_ACCESS_TOKEN;

if (accessToken) {
  setAccessToken(accessToken);
}

configStore.setConfig(config);

i18n.addTranslations('en', 'ui', EN);
i18n.addTranslations('ru', 'ui', RU);

Vue.use(VueCompositionApi);

i18n.init({ debug: false, lng: 'ru' }).then(() => {
  Vue.use(i18n.getPlugin());
});
