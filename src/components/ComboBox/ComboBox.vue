<template>
  <div ref="selectRef" class="select">
    <div ref="inputContainerRef" class="select-control-wrapper">
      <BaseInput
        v-model="query"
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

      <SvgIcon
        v-if="menuIsOpen"
        name="search"
        class="icon-search"
        focusable="false"
        aria-hidden="true"
      />

      <button
        v-else-if="clearable && value"
        class="btn-clear"
        type="button"
        :disabled="disabled"
        @click="handleClearClick"
      >
        <SvgIcon
          name="clear"
          class="icon-clear"
          focusable="false"
          aria-hidden="true"
        />
      </button>

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
        <p class="loading">Loading</p>
      </li>
      <li v-if="query && isResultsNotFound">
        <p class="empty">{{ noOptionsMessage }}</p>
      </li>
      <li
        v-for="(option, index) in filteredOptions"
        v-else
        :key="index"
        :class="[
          'select-item',
          {
            selected: isOptionSelected(option),
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
  ref,
  watch,
} from '@vue/composition-api';

import BaseInput from '../BaseInput';
import SvgIcon from '../SvgIcon';
import usePopper from '../../hooks/usePopper';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { OptionType } from '../../typings/common';

export interface Props {
  value: OptionType | null;
  options: Array<OptionType>;
  autocomplete: string;
  placeholder: string;
  loading: boolean;
  disabled: boolean;
  clearable: boolean;
  noOptionsMessage: string;
}

export default defineComponent<Props>({
  name: 'ComboBox',
  components: { BaseInput, SvgIcon },
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
      validator: (value: string) => ['on', 'off'].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    noOptionsMessage: {
      type: String,
      default: 'No options',
    },
  },
  setup(props: Props, context) {
    const query = ref<string>('');
    const menuIsOpen = ref<boolean>(false);
    const inputContainerRef = ref<Element | null>(null);
    const popperRef = ref<HTMLElement | null>(null);
    const selectRef = ref<HTMLElement | null>(null);
    const highlightedIndex = ref<number>(-1);

    onMounted(() => {
      if (props.value) {
        highlightedIndex.value = props.options.indexOf(props.value);
      }
    });

    watch(menuIsOpen, (currentMenuIsOpen) => {
      if (currentMenuIsOpen) {
        showMenu();
      } else {
        query.value = '';
        blurInput();
        hideMenu();
      }
    });

    watch(query, (newQuery) => {
      context.emit('change:query', newQuery);
    });

    const computedPlaceholder = computed(() => {
      return props.value ? props.value.label : props.placeholder;
    });

    const filteredOptions = computed<Array<OptionType>>(() => {
      if (query.value) {
        return props.options.filter((option: OptionType) =>
          option.label.toLowerCase().includes(query.value.toLowerCase())
        );
      }
      return props.options;
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

    function focusInput() {
      inputContainerRef.value?.querySelector('input')?.focus();
    }

    function blurInput() {
      inputContainerRef.value?.querySelector('input')?.blur();
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
      focusInput();
    }

    function handleOptionSelect(option: OptionType, index: number) {
      query.value = '';
      highlightedIndex.value = index;
      handleMenuClose();
      handleChange(option);
    }

    useOnClickOutside(selectRef, () => {
      handleMenuClose();
    });

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
      if (filteredOptions.value.length === 0 || props.loading) {
        return;
      }

      if (index < 0) {
        highlightedIndex.value = filteredOptions.value.length - 1;
      } else if (index >= filteredOptions.value.length) {
        highlightedIndex.value = 0;
      } else {
        highlightedIndex.value = index;
      }

      if (popperRef.value) {
        const highlightedOptionElement = popperRef.value.querySelector<
          HTMLElement
        >(`li:nth-child(${highlightedIndex.value + 1})`);

        if (!highlightedOptionElement) return;

        const scrollTop = popperRef.value.scrollTop;
        const offsetTop = highlightedOptionElement.offsetTop;

        if (
          offsetTop + highlightedOptionElement.scrollHeight >
          scrollTop + popperRef.value?.clientHeight
        ) {
          highlightedOptionElement.scrollIntoView(false);
        }

        if (offsetTop < scrollTop) {
          highlightedOptionElement.scrollIntoView(true);
        }
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
  fill: rgba(0, 0, 0, 0.25);
  transition: fill 0.3s;
}

.btn-clear {
  &:hover {
    .icon-clear {
      fill: rgba(0, 0, 0, 0.85);
    }
  }

  &:disabled {
    cursor: default;
    .icon-clear {
      fill: rgba(0, 0, 0, 0.25);
    }
  }
}

.select-menu {
  position: absolute;
  width: 100%;
  max-height: 300px;
  display: none;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 0.25rem;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);

  &.show {
    display: block;
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
    background-color: #e6f7ff;

    &:hover {
      background-color: #f5f5f5;
    }
  }

  &.highlighted,
  &:hover {
    background: #f5f5f5;
  }

  &.selected.highlighted {
    background-color: #e6f7ff;
  }
}

.empty {
  padding: 10px 0;
  margin: 0;
  text-align: center;
  color: #999;
  font-size: 14px;
}
</style>
