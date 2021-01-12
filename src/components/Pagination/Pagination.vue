<template>
  <div v-if="pageCount > 1" class="pagination">
    <div class="size-select-container">
      <BaseSelect
        :value="selectedPageSizeOption"
        name="size"
        class="size-select"
        :options="pageSizeOptions"
        :disabled="disabled"
        hide-placeholder-option
        @change="goToCommonPageSizeChange"
      />
    </div>

    <ul class="pager">
      <li class="page-item prev">
        <button
          class="btn-prev"
          type="button"
          :disabled="isPreviousButtonDisabled || disabled"
          @click="goToPreviousPage"
        >
          <SvgIcon class="icon-prev" name="chevronLeft" />
        </button>
      </li>

      <li v-for="(page, index) in pageList" :key="index" class="page-item">
        <button
          v-if="page.type === 'button'"
          class="btn-page"
          type="button"
          tabindex="0"
          :class="{
            disabled: page.disabled,
            selected: page.selected && !page.disabled,
          }"
          :disabled="disabled"
          @click="goToCommonPage(page)"
        >
          {{ page.value }}
        </button>

        <div v-else-if="page.type === 'dots'" :class="['dots', { disabled }]">
          {{ page.value }}
        </div>
      </li>

      <li class="page-item next">
        <button
          class="btn-next"
          type="button"
          tabindex="0"
          :disabled="isNextButtonDisabled || disabled"
          @click="goToNextPage"
        >
          <SvgIcon class="icon-next" name="chevronRight" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';

import BaseSelect from '../BaseSelect/index.vue';
import SvgIcon from '../SvgIcon';
import { OptionType } from '../../typings/common';

interface Page {
  value: string;
  number: number;
  type: 'button' | 'dots';
  selected: boolean;
}

interface Props {
  pageNumber: number;
  pageCount: number;
  pageSize: number;
  pageItemCount: number;
  disabled: boolean;
  pageSizes: Array<number>;
}

export default defineComponent<Props>({
  name: 'Pagination',
  components: {
    BaseSelect,
    SvgIcon,
  },
  props: {
    pageNumber: {
      type: Number,
      default: 1,
    },
    pageCount: {
      type: Number,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    pageItemCount: {
      type: Number,
      default: 9,
    },
  },
  setup(props, context) {
    const isPreviousButtonDisabled = computed(() => props.pageNumber === 1);
    const isNextButtonDisabled = computed(
      () => props.pageNumber === props.pageCount
    );

    const pageSizeOptions = computed<Array<OptionType>>(() => {
      return props.pageSizes.map((size) => ({
        value: String(size),
        label: `${size} / page`,
      }));
    });

    const selectedPageSizeOption = computed<OptionType>(() => {
      const foundOption = pageSizeOptions.value.find(
        (option) => Number(option.value) === props.pageSize
      );

      if (!foundOption) {
        throw new Error(
          'Page size option is not found. Please specify correct page size prop'
        );
      }

      return foundOption;
    });

    const pageList = computed<Array<Page>>(() => {
      const pages: Array<Page> = [];

      if (props.pageCount <= props.pageItemCount) {
        for (let i = 1; i < props.pageCount + 1; i++) {
          pages.push({
            number: i,
            value: String(i),
            type: 'button',
            selected: props.pageNumber === i,
          });
        }
        return pages;
      }

      const thresholdLeft = Math.floor(props.pageItemCount / 2);
      const thresholdRight = props.pageCount - thresholdLeft + 1;

      if (props.pageNumber <= thresholdLeft) {
        for (let i = 1; i < props.pageItemCount + 1; i++) {
          pages.push({
            number: i,
            value: String(i),
            type: 'button',
            selected: props.pageNumber === i,
          });
        }
        pages[pages.length - 2] = {
          number: props.pageCount - 1,
          value: '...',
          type: 'dots',
          selected: false,
        };
        pages[pages.length - 1].value = String(props.pageCount);
        pages[pages.length - 1].number = props.pageCount;
      } else if (props.pageNumber >= thresholdRight) {
        for (
          let i = props.pageCount - props.pageItemCount + 1;
          i < props.pageCount + 1;
          i++
        ) {
          pages.push({
            number: i,
            value: String(i),
            type: 'button',
            selected: props.pageNumber === i,
          });
        }
        pages[0].value = '1';
        pages[0].number = 1;
        pages[1] = {
          number: 2,
          value: '...',
          type: 'dots',
          selected: false,
        };
      } else {
        for (let i = 0; i < props.pageItemCount; i++) {
          const number =
            props.pageNumber - Math.floor(props.pageItemCount / 2) + i;
          pages.push({
            number: number,
            value: String(number),
            type: 'button',
            selected: props.pageNumber === number,
          });
        }
        pages[0] = {
          number: 1,
          value: '1',
          type: 'button',
          selected: false,
        };
        pages[1] = {
          number: 2,
          value: '...',
          type: 'dots',
          selected: false,
        };
        pages[pages.length - 2] = {
          number: props.pageCount - 1,
          value: '...',
          type: 'dots',
          selected: false,
        };
        pages[pages.length - 1] = {
          number: props.pageCount,
          value: String(props.pageCount),
          type: 'button',
          selected: false,
        };
      }

      return pages;
    });

    function goToPreviousPage(): void {
      const pageNumber: number = props.pageNumber - 1;
      context.emit('change:page-number', pageNumber);
    }

    function goToNextPage(): void {
      const pageNumber: number = props.pageNumber + 1;
      context.emit('change:page-number', pageNumber);
    }

    function goToCommonPage(page: Page): void {
      if (page.selected) return;
      context.emit('change:page-number', page.number);
    }

    function goToCommonPageSizeChange(selectedOption: OptionType) {
      const newPageSize = Number(selectedOption.value);
      context.emit('change:page-size', newPageSize);
    }

    return {
      isPreviousButtonDisabled,
      isNextButtonDisabled,
      goToPreviousPage,
      goToNextPage,
      goToCommonPage,
      selectedPageSizeOption,
      pageSizeOptions,
      goToCommonPageSizeChange,
      pageList,
    };
  },
});
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  align-items: center;
}

.pager {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  align-items: center;
}

.page-item {
  margin: 0 3px;

  &:first-child,
  &:last-child {
    margin: 0;
  }
}

.btn-prev,
.btn-next,
.btn-page {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  min-width: 32px;
  padding: 0 6px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  outline: 0;
  color: rgba(0, 0, 0, 0.85);

  &.selected {
    color: #fff;
    border-color: var(--primary);
    background-color: var(--primary);

    &:hover,
    &:focus {
      color: #fff;
      border-color: var(--primary);
    }

    &:disabled {
      color: rgba(0, 0, 0, 0.26);
      border-color: #d9d9d9;
      background-color: #d9d9d9;
      pointer-events: none;
    }
  }

  &:hover,
  &:focus {
    color: var(--primary);
    border-color: var(--primary);
  }

  &:disabled {
    color: rgba(0, 0, 0, 0.26);
    border-color: #d9d9d9;
    pointer-events: none;
  }
}

.btn-prev,
.btn-next {
  padding: 0;
}

.icon-prev,
.icon-next {
  fill: currentColor;
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 1.25rem;
  user-select: none;
  pointer-events: none;
}

.dots {
  color: rgba(0, 0, 0, 0.85);
  height: auto;
  padding: 0 6px;
  font-size: 0.875rem;
  min-width: 32px;
  text-align: center;
  font-weight: 400;
  line-height: 1.43;
  border-radius: 16px;
  letter-spacing: 0.01071em;

  &.disabled {
    color: rgba(0, 0, 0, 0.26);
  }
}

.size-select-container {
  margin-right: 15px;
}

.size-select {
  height: 32px;
  padding-top: 0;
  padding-bottom: 0;

  border: 1px solid #d9d9d9;
  border-radius: 2px;

  &:hover {
    border-color: var(--primary);
  }

  &:focus {
    box-shadow: none;
  }

  &:disabled {
    color: rgba(0, 0, 0, 0.26);
    border-color: #d9d9d9;
    background-color: #d9d9d9;
  }
}
</style>
