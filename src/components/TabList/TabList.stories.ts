import TabList from './TabList.vue';

export default { title: 'TabList' };

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
    '<div style="margin: 20px;"><TabList :tab-list="tabList" :selected-tab-id="selectedTabId" @tab:update="selectedTabId = $event.tabId" /></div>',
});

export const AlignedRight = () => ({
  name: 'TabList_AlignedRight',
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
    '<div style="margin: 20px;"><TabList :tab-list="tabList" :aligned-right="true" :selected-tab-id="selectedTabId" @tab:update="selectedTabId = $event.tabId" /></div>',
});

export const WithBordered = () => ({
  name: 'TabList_Bordered',
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
    '<div style="margin: 20px;"><TabList :tab-list="tabList" :bordered="true" :selected-tab-id="selectedTabId" @tab:update="selectedTabId = $event.tabId" /></div>',
});

export const WithBorderedAlignedRight = () => ({
  name: 'TabList_BorderedAlignedRight',
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
    '<div style="margin: 20px;"><TabList :tab-list="tabList" :aligned-right="true" :bordered="true" :selected-tab-id="selectedTabId" @tab:update="selectedTabId = $event.tabId" /></div>',
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
