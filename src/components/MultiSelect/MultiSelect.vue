<template>
  <div>
    <ul v-if="options.length > 0" class="option-list" data-multi-select-list>
      <li
        v-for="(option, index) of options"
        :key="option.value"
        :class="[
          'option',
          {
            selected: isCheckedOption(option),
            focused: isFocusedOption(option),
          },
        ]"
      >
        <div class="option-inner">
          <BaseCheckbox
            :id="`${name}[${index}]`"
            :checked="isCheckedOption(option)"
            @change="toggleOption(option)"
            @focus="handleOptionFocus(option)"
            @blur="handleOptionBlur(option)"
          />
          <label :for="`${name}[${index}]`">
            {{ option.label }}
          </label>
        </div>
      </li>
    </ul>
    <div v-else class="empty-block">
      <span>Items not found</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext } from '@vue/composition-api';

import BaseCheckbox from '../BaseCheckbox/index.vue';
import { isValidSelectOption } from '../../utils/common';
import { OptionType } from '../../../typings';

interface Props {
  name: string;
  options: Array<OptionType>;
  selectedOptions: Array<OptionType>;
}

export default defineComponent<Props>({
  name: 'MultiSelect',
  components: { BaseCheckbox },
  model: {
    event: 'change',
    prop: 'selectedOptions',
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      default: () => [],
      validator(options: Array<OptionType>) {
        return options.every(isValidSelectOption);
      },
    },
    selectedOptions: {
      type: Array,
      default: () => [],
      validator(options: Array<OptionType>) {
        return options.every(isValidSelectOption);
      },
    },
  },
  setup(props: Props, context: SetupContext) {
    const focusedOption = ref<OptionType | null>(null);

    function isCheckedOption(option: OptionType) {
      return props.selectedOptions.some(
        (selectedOption) => selectedOption.value === option.value
      );
    }

    function isFocusedOption(option: OptionType) {
      return focusedOption.value
        ? focusedOption.value.value === option.value
        : false;
    }

    function toggleOption(option: OptionType) {
      const isChecked = isCheckedOption(option);

      const newSelectedOptions = isChecked
        ? props.selectedOptions.filter(
            (selectedOption) => selectedOption.value !== option.value
          )
        : [...props.selectedOptions, option];

      context.emit('change', newSelectedOptions);
    }

    function handleOptionFocus(option: OptionType) {
      focusedOption.value = option;
    }

    function handleOptionBlur(option: OptionType) {
      if (focusedOption.value && focusedOption.value.value === option.value) {
        focusedOption.value = null;
      }
    }

    return {
      focusedOption,
      isCheckedOption,
      isFocusedOption,
      toggleOption,
      handleOptionFocus,
      handleOptionBlur,
    };
  },
});
</script>

<style scoped lang="scss">
.option-list {
  max-height: 250px;
  border: 1px solid var(--input-border-color);
  border-radius: 3px;

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

.empty-block {
  padding: 2.5rem 1rem;
  text-align: center;
  border: 1px solid var(--input-border-color);
  border-radius: 3px;

  span {
    color: var(--secondary);
  }
}

.option {
  cursor: pointer;
  position: relative;

  &:hover,
  &.focused {
    background-color: #d1e3ff;
  }

  &.selected {
    background-color: var(--primary);
    color: white;
  }
}

.option-inner {
  label {
    display: block;
    padding: 0.5rem 0.5rem 0.5rem 1.75rem;
    margin-bottom: 0;
    cursor: pointer;
  }

  input {
    margin: 0.8rem 0 0 0.5rem;
  }

  label {
    transition: box-shadow 0.15s ease-in-out;
  }
}

.checkbox-field {
  margin-bottom: 0;
}
</style>
