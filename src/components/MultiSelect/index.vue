<template>
  <div>
    <ul>
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
          <base-checkbox
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
  </div>
</template>

<script lang="js">
  import Vue from 'vue';

  import BaseCheckbox from '../BaseCheckbox';

  function isValidOption(option) {
      return (
        typeof option === 'object' &&
        'value' in option &&
        'label' in option
      )
  }

export default Vue.extend({
  name: 'MultiCheckboxSelect',
  components: { BaseCheckbox },
  model: {
    event: 'change',
    prop: 'selectedOptions'
  },
  props: {
    options: {
      type: Array,
      default: [],
      validator(options) {
        return options.every(isValidOption)
      }
    },
    selectedOptions: {
      type: Array,
      default: [],
      validator(options) {
        return options.every(isValidOption)
      }
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      focusedOption: null,
    }
  },
  methods: {
    isCheckedOption(option) {
      return this.selectedOptions.some(selectedOption => selectedOption.value === option.value);
    },
    isFocusedOption(option) {
      return this.focusedOption ? this.focusedOption.value === option.value : false;
    },
    toggleOption(option) {
      const isChecked = this.isCheckedOption(option);

      const newSelectedOptions = isChecked ? this.selectedOptions.filter(selectedOption => selectedOption.value !== option.value) : [...this.selectedOptions, option]
      this.$emit('change', newSelectedOptions)
    },
    handleOptionFocus(option) {
      this.focusedOption = option;
    },
    handleOptionBlur(option) {
      if (this.focusedOption && this.focusedOption.value === option.value) {
        this.focusedOption = null;
      }
    }
  }
});
</script>

<style scoped lang="scss">
ul {
  max-height: 250px;
  overflow: auto;
  border: 1px solid var(--input-border-color);
  border-radius: 3px;
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
