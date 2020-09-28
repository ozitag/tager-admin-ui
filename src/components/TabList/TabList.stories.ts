import Vue from 'vue';
import VueCompositionApi from 'vue';

import TabList from './TabList.vue';

export default { title: 'TabList' };

Vue.use(VueCompositionApi);

export const Default = () => ({
  name: 'TabList_Default',
  components: { TabList },
  data() {
    return {
      selectedTabId: 'common',
      tabList: [
        {
          id: 'common',
          label: 'Common',
        },
        {
          id: 'images',
          label: 'Images',
        },
        {
          id: 'relations',
          label: 'Relations',
        },
        {
          id: 'seo',
          label: 'SEO',
        },
      ],
    };
  },
  template:
    '<TabList :tab-list="tabList" :selected-tab-id="selectedTabId" @tab:update="selectedTabId = $event.tabId" />',
});

export const WithErrors = () => ({
  name: 'TabList_WithErrors',
  components: { TabList },
  data() {
    return {
      selectedTabId: 'common',
      tabList: [
        {
          id: 'common',
          label: 'Common',
          hasErrors: true,
        },
        {
          id: 'images',
          label: 'Images',
        },
        {
          id: 'relations',
          label: 'Relations',
        },
        {
          id: 'seo',
          label: 'SEO',
          hasErrors: true,
        },
      ],
    };
  },
  template:
    '<TabList :tab-list="tabList" :selected-tab-id="selectedTabId" @tab:update="selectedTabId = $event.tabId" />',
});
