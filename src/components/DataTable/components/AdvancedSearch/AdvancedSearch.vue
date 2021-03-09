<template>
  <div class="advanced-search">
    <div class="advanced-search-header">
      <BaseButton class="advanced-search-toggle" @click="handleToggleClick">
        {{ computedToggleLabel }}
        <SvgIcon v-if="isOpen" class="icon-expand-less" name="expandLess" />
        <SvgIcon v-else class="icon-expand-more" name="expandMore" />
      </BaseButton>

      <div class="tag-grid">
        <div v-for="(tag, index) of tags" :key="index" class="tag-item">
          <div class="tag" :title="tag.title" @click="handleTagClick(tag)">
            <span class="tag-label"> {{ tag.title }}: {{ tag.label }} </span>
            <SvgIcon class="tag-close" name="close" />
          </div>
        </div>
      </div>
    </div>

    <slot v-if="isOpen"></slot>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  SetupContext,
} from '@vue/composition-api';

import BaseButton from '../../../BaseButton/index.vue';
import SvgIcon from '../../../SvgIcon';
import useTranslation from '../../../../hooks/useTranslation';
import { FilterTagType } from '../../../../typings/common';

interface Props {
  tags: FilterTagType;
  toggleLabel: string;
}

export default defineComponent<Props>({
  name: 'AdvancedSearch',
  components: {
    BaseButton,
    SvgIcon,
  },
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
    toggleLabel: {
      type: String,
      default: '',
    },
  },
  setup(props: Props, context: SetupContext) {
    const isOpen = ref<boolean>(false);
    const { t } = useTranslation(context);

    function handleToggleClick() {
      isOpen.value = !isOpen.value;
    }

    function handleTagClick(tag: FilterTagType) {
      context.emit('click:tag', tag);
    }

    const computedToggleLabel = computed(() => {
      if (props.toggleLabel) {
        return props.toggleLabel;
      }
      return t('ui:advancedSearch.toggleLabel');
    });

    return {
      isOpen,
      handleTagClick,
      handleToggleClick,
      computedToggleLabel,
    };
  },
});
</script>

<style scoped lang="scss">
.advanced-search {
  position: relative;
  margin-bottom: 1rem;
}

.advanced-search-header {
  display: flex;
  align-items: flex-start;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  .tag-grid {
    --gap: 0.25rem;

    display: flex;
    flex-wrap: wrap;

    margin: calc(-1 * var(--gap));

    .tag-item {
      padding: var(--gap);
    }
  }
}

.advanced-search-toggle {
  display: flex;
  align-items: center;
  margin-right: 1rem;
  white-space: nowrap;

  .icon-expand-more,
  .icon-expand-less {
    width: 20px;
    height: 20px;
    fill: currentColor;
    margin-left: 0.375rem;
  }
}

.tag {
  position: relative;
  max-width: 100%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  vertical-align: top;
  cursor: pointer;
  background: #eee;
  border: 1px solid transparent;
  border-radius: 0.12rem;
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background: #ddd;

    .tag-label {
      text-decoration: line-through;
    }

    .tag-close {
      opacity: 1;
    }
  }

  .tag-label {
    padding: 0.375rem 1.875rem 0.375rem 0.75rem;
    position: relative;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--text-color);
  }

  .tag-close {
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translateY(-50%);
    display: flex;
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }
}
</style>
