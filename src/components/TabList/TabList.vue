<template>
  <ul
    data-ui-tab-list
    :class="[
      'tab-list',
      {
        bordered,
        'aligned-right': alignedRight,
      },
    ]"
  >
    <li
      v-for="tab of tabList"
      :key="tab.id"
      :class="[
        'tab',
        { active: selectedTabId === tab.id, invalid: tab.hasErrors },
      ]"
      data-ui-tab
      :data-active="selectedTabId === tab.id ? true : undefined"
    >
      <button
        class="tab-button"
        type="button"
        data-ui-tab-button
        @click="handleTabClick(tab.id)"
      >
        {{ tab.label }} <span v-if="tab.hasErrors">*</span>
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export type TabType = {
  id: string;
  label: string;
  hasErrors?: boolean;
};

type Props = Readonly<{
  tabList: Array<TabType>;
  selectedTabId: string;
  bordered: {
    type: boolean;
    default: true;
  };
  alignedRight: {
    type: boolean;
    default: false;
  };
}>;

export default defineComponent<Props>({
  name: 'TabList',
  props: {
    tabList: {
      type: Array,
      required: true,
    },
    selectedTabId: {
      type: String,
      required: true,
    },
    bordered: {
      type: Boolean,
      required: false,
    },
    alignedRight: {
      type: Boolean,
      required: false,
    },
  },
  setup(props, context) {
    function handleTabClick(tabId: string): void {
      if (props.selectedTabId === tabId) return;

      context.emit('tab:update', { tabId });
    }

    return {
      handleTabClick,
    };
  },
});
</script>

<style scoped lang="scss">
.tab-list {
  display: flex;
  border-bottom: 1px solid #eee;
  margin: -1rem -1rem 1.5rem -1rem;

  &.aligned-right {
    justify-content: flex-end;

    .tab-button {
      border-left: 1px solid #eee;
    }

    .tab:not(:last-child) .tab-button {
      border-right-color: #eee;
    }

    .tab.active:before {
      right: -1px;
    }
  }

  &:not(.aligned-right) {
    .tab-button {
      border-right: 1px solid #eee;
    }

    .tab.active:before {
      left: -1px;
    }

    .tab:not(:first-child) .tab-button {
      border-left-color: #eee;
    }

    &.bordered {
      .tab:first-child.active:before {
        left: -1px;
      }
    }
  }

  &.bordered {
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
  }
}

.tab {
  display: block;
  margin-bottom: -1px;
  margin-top: -1px;

  &:not(.active):not(.invalid):hover {
    color: var(--secondary);
  }

  &.active {
    background-color: #fff;
    border-top-color: var(--primary);
    position: relative;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 3px;
      display: block;
      background: var(--primary);
    }

    .tab-button {
      cursor: default;
    }
  }

  &.invalid {
    color: red;
  }
}

.tab-button {
  padding: 0.7rem 2rem;
  color: inherit;
  font-weight: inherit;
}
</style>
