<template>
  <div ref="selectRef" class="select">
    <div ref="inputContainerRef" class="select-control-wrapper">
      <BaseInput
        v-if="searchable"
        v-model="query"
        v-bind="$attrs"
        class="select-control"
        :placeholder="computedPlaceholder"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :class="{ 'is-focus': menuIsOpen }"
        @input="handleInput"
        @focus="handleInputFocus"
        @keydown.up.prevent="highlight(highlightedIndex - 1)"
        @keydown.down.prevent="highlight(highlightedIndex + 1)"
        @keydown.enter.prevent="handleKeyEnter"
        @keydown.esc.stop.prevent="handleMenuClose"
        @keydown.tab="handleMenuClose"
      />

      <BaseButton
        v-else
        v-bind="$attrs"
        class="select-trigger"
        :disabled="disabled"
        :class="{ 'is-focus': menuIsOpen }"
        @click="handleInputFocus"
        @keydown.up.prevent="highlight(highlightedIndex - 1)"
        @keydown.down.prevent="highlight(highlightedIndex + 1)"
        @keydown.enter.prevent="handleKeyEnter"
        @keydown.esc.stop.prevent="handleMenuClose"
        @keydown.tab="handleMenuClose"
      >
        {{ computedPlaceholder }}
      </BaseButton>

      <SvgIcon
        v-if="searchable && menuIsOpen && !loading"
        name="search"
        class="icon-search"
        focusable="false"
        aria-hidden="true"
      />

      <button
        v-else-if="clearable && value && !loading && !disabled"
        class="btn-clear"
        type="button"
        @click="handleClearClick"
      >
        <SvgIcon
          name="clear"
          class="icon-clear"
          focusable="false"
          aria-hidden="true"
        />
      </button>

      <span v-else-if="loading" class="icon-expand-more">
        <Spinner size="20" />
      </span>

      <SvgIcon
        v-else
        name="expandMore"
        class="icon-expand-more"
        focusable="false"
        aria-hidden="true"
      />
    </div>

    <ul ref="popperRef" class="select-menu" :class="[{ show: menuIsOpen }]">
      <li v-if="loading">
        <p class="empty">Loading...</p>
      </li>

      <li v-else-if="options.length === 0">
        <p class="empty">{{ noOptionsMessage }}</p>
      </li>

      <li v-else-if="query && isResultsNotFound">
        <p class="not-found">{{ notFoundMessage }}</p>
      </li>

      <li
        v-for="(option, index) in filteredOptions"
        v-else
        :key="index"
        :class="[
          'select-item',
          {
            selected: isOptionSelected(option),
            disabled: option.disabled,
            highlighted: highlightedIndex === index,
          },
        ]"
        @click="handleOptionSelect(option, index)"
        @mouseenter="handleMouseEnter(index)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  SetupContext,
  watch,
} from '@vue/composition-api';

import BaseInput from '../BaseInput';
import BaseButton from '../BaseButton/index.vue';
import Spinner from '../Spinner';
import SvgIcon from '../SvgIcon';
import usePopper from '../../hooks/usePopper';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { scrollOptionIntoView } from './ComboBox.helpers';

import debounce from 'lodash/debounce';
import { OptionType } from '../../typings/common';

export interface Props {
  value: OptionType | null;
  options: Array<OptionType>;
  autocomplete: string;
  placeholder: string;
  disabled: boolean;
  clearable: boolean;
  noOptionsMessage: string;
  notFoundMessage: string;
  searchable: boolean;
  filterable: boolean;
  loading: boolean;
}

export default defineComponent<Props>({
  name: 'ComboBox',
  inheritAttrs: false,
  components: { BaseInput, BaseButton, SvgIcon, Spinner },
  props: {
    value: {
      type: Object,
      default: () => null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: 'Select...',
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    searchable: {
      type: Boolean,
      default: true,
    },
    filterable: {
      type: Boolean,
      default: true,
    },
    noOptionsMessage: {
      type: String,
      default: 'No options',
    },
    notFoundMessage: {
      type: String,
      default: 'No results found',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: Props, context: SetupContext) {
    const query = ref<string>('');
    const menuIsOpen = ref<boolean>(false);
    const inputContainerRef = ref<HTMLElement | null>(null);
    const popperRef = ref<HTMLElement | null>(null);
    const selectRef = ref<HTMLElement | null>(null);
    const highlightedIndex = ref<number>(-1);

    onMounted(() => {
      if (props.value) {
        highlightedIndex.value = props.options.indexOf(props.value);
      }
    });

    const emitDebouncedChangeEvent = debounce(() => {
      context.emit('change:query', query.value);
    }, 300);

    watch(query, () => {
      emitDebouncedChangeEvent();
    });

    const computedPlaceholder = computed(() => {
      return props.value ? props.value.label : props.placeholder;
    });

    const filteredOptions = computed<Array<OptionType>>(() => {
      if (!props.filterable) {
        return props.options;
      }

      if (query.value) {
        return props.options.filter((option: OptionType) =>
          option.label.toLowerCase().includes(query.value.toLowerCase())
        );
      }

      return props.options;
    });

    function getOptionElementByIndex(index: number): HTMLElement | null {
      if (!popperRef.value) return null;

      return popperRef.value.querySelector<HTMLElement>(
        `li:nth-child(${index + 1})`
      );
    }

    watch(menuIsOpen, (currentMenuIsOpen) => {
      if (currentMenuIsOpen) {
        showMenu();

        if (popperRef.value && inputContainerRef.value) {
          popperRef.value.style.width =
            inputContainerRef.value.offsetWidth + 'px';
        }

        /** Scroll to selected option */
        if (popperRef.value) {
          const selectedOptionIndex = filteredOptions.value.findIndex(
            (filteredOption) => filteredOption.value === props.value?.value
          );
          const selectedOptionElement = getOptionElementByIndex(
            selectedOptionIndex
          );

          if (selectedOptionElement) {
            /** Scroll option into view **/
            scrollOptionIntoView(selectedOptionElement);
          }
        }
      } else {
        query.value = '';
        blurSelect();
        hideMenu();
      }
    });

    const isResultsNotFound = computed(() => {
      return filteredOptions.value.length === 0;
    });

    const { show: showMenu, hide: hideMenu } = usePopper(
      inputContainerRef,
      popperRef,
      {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 10],
            },
          },
        ],
      }
    );

    onUnmounted(() => {
      hideMenu();
    });

    function getSelectControlElement(): HTMLElement | null {
      if (!inputContainerRef.value) return null;

      if (props.searchable) {
        return inputContainerRef.value.querySelector('input');
      } else {
        return inputContainerRef.value.querySelector('button');
      }
    }

    function focusSelect() {
      getSelectControlElement()?.focus();
    }

    function blurSelect() {
      getSelectControlElement()?.blur();
    }

    function handleChange(newValue: OptionType | null): void {
      context.emit('input', newValue);
      context.emit('change', newValue);
    }

    function handleMenuClose() {
      menuIsOpen.value = false;
    }

    function handleInputFocus() {
      menuIsOpen.value = true;
    }

    function isOptionSelected(option: OptionType) {
      return props.value?.value === option.value;
    }

    function handleInput(value: string) {
      query.value = value;
    }

    function handleClearClick() {
      handleChange(null);
      highlightedIndex.value = -1;
      focusSelect();
    }

    function handleOptionSelect(option: OptionType, index: number) {
      if (option.disabled) {
        return;
      }

      query.value = '';
      highlightedIndex.value = index;
      handleMenuClose();
      handleChange(option);
    }

    useOnClickOutside(
      selectRef,
      (event: Event) => {
        if (!selectRef.value || !popperRef.value) return;

        const clickedNode = event.target as Node;
        const isSameElement =
          selectRef.value === clickedNode && popperRef.value === clickedNode;

        const isClickedOutside =
          !isSameElement &&
          !selectRef.value.contains(clickedNode) &&
          !popperRef.value.contains(clickedNode);

        if (isClickedOutside) {
          handleMenuClose();
        }
      },
      'custom'
    );

    function handleMouseEnter(index: number) {
      highlightedIndex.value = index;
    }

    function handleKeyEnter() {
      if (
        highlightedIndex.value >= 0 &&
        highlightedIndex.value < filteredOptions.value.length
      ) {
        handleOptionSelect(
          filteredOptions.value[highlightedIndex.value],
          highlightedIndex.value
        );
      }
    }

    function highlight(index: number) {
      if (filteredOptions.value.length === 0) {
        return;
      }

      if (index < 0) {
        highlightedIndex.value = filteredOptions.value.length - 1;
      } else if (index >= filteredOptions.value.length) {
        highlightedIndex.value = 0;
      } else {
        highlightedIndex.value = index;
      }

      const highlightedOptionElement = getOptionElementByIndex(
        highlightedIndex.value
      );

      if (highlightedOptionElement && popperRef.value) {
        /** Scroll option into view **/
        scrollOptionIntoView(highlightedOptionElement);
      }
    }

    return {
      inputContainerRef,
      popperRef,
      selectRef,
      filteredOptions,
      isResultsNotFound,
      handleInput,
      handleInputFocus,
      handleOptionSelect,
      query,
      menuIsOpen,
      isOptionSelected,
      computedPlaceholder,
      handleClearClick,
      highlight,
      highlightedIndex,
      handleKeyEnter,
      handleMouseEnter,
      handleMenuClose,
    };
  },
});
</script>

<style scoped lang="scss">
.select {
  position: relative;
  width: 100%;
}

.select-control-wrapper {
  position: relative;
}

.select-control {
  padding-right: 2.5rem;

  &::placeholder {
    color: var(--input-color);
  }

  &.is-focus,
  &:focus {
    &::placeholder {
      color: var(--input-placeholder-color);
    }
  }
}

.select-trigger {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 2.5rem 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--input-color);
  text-align: left;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid var(--input-border-color);
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover {
    background-color: #fff !important;
  }

  &:focus {
    color: var(--input-color);
    background-color: #fff;
    border-color: var(--input-focus-border-color);
    outline: 0;
    box-shadow: 0 0 0 0.2rem var(--input-focus-box-shadow);
  }
}

.btn-clear,
.icon-search,
.icon-expand-more {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
  display: flex;
}

.icon-clear,
.icon-search,
.icon-expand-more {
  pointer-events: none;
  width: 20px;
  height: 20px;
  fill: var(--input-color);
  transition: fill 0.3s;
}

.btn-clear {
  &:hover {
    .icon-clear {
      fill: rgba(0, 0, 0, 0.85);
    }
  }

  &:disabled {
    cursor: not-allowed;

    .icon-clear {
      fill: rgba(0, 0, 0, 0.25);
    }
  }
}

.select-menu {
  position: absolute;
  width: 100%;
  max-height: 300px;
  margin-top: 10px;
  display: none;
  background-color: #fff;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
  z-index: 1;

  &.show {
    display: block;
  }

  /** Custom Scrollbars **/
  overflow: hidden;

  &:hover {
    overflow-y: auto;
  }

  /* Works on Firefox */
  scrollbar-width: thin;
  scrollbar-color: rgba(144, 147, 153, 0.3) #fff;

  /* Works on Chrome, Edge, and Safari */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: #fff;
  }

  &::-webkit-scrollbar-thumb {
    height: 56px;
    background-color: rgba(144, 147, 153, 0.3);

    &:hover {
      background-color: rgba(144, 147, 153, 0.5);
    }
  }
}

.select-item {
  width: 100%;
  min-height: 34px;
  padding: 0.375rem 0.75rem;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
  cursor: pointer;
  list-style: none;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &.selected {
    color: rgba(0, 0, 0, 0.85);
    font-weight: 600;
    background-color: rgba(0, 0, 0, 0.05);
  }

  &.highlighted {
    background: #f5f5f5;
  }

  &.selected.highlighted {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &.disabled {
    color: #c0c4cc;
    cursor: not-allowed;
  }
}

.not-found,
.empty {
  padding: 10px 0;
  margin: 0;
  text-align: center;
  color: #999;
  font-size: 14px;
  user-select: none;
}

.blur {
  filter: blur(2px);
  pointer-events: none;
}
</style>
