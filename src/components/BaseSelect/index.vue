<template>
  <select :value="value" :multiple="multiple" v-on="inputListeners">
    <option disabled value="">
      {{
        placeholder || multiple ? 'Please select multiple' : 'Please select one'
      }}
    </option>

    <option
      v-for="option of options"
      :key="option.value"
      :value="option.value"
      :selected="option.value === value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script lang="ts">
import Vue from 'vue';
import { OptionType } from '@tager/admin-ui';

export default Vue.extend({
  name: 'BaseSelect',
  props: {
    value: [Object, Array] as [() => OptionType, () => Array<OptionType>],
    multiple: {
      type: Boolean,
      default: false,
    },
    placeholder: String,
    options: {
      type: Array as () => Array<OptionType>,
      default: () => [],
      validator(options: any): boolean {
        return (
          Array.isArray(options) &&
          options.every((option) => {
            return (
              typeof option === 'object' &&
              'value' in option &&
              'label' in option
            );
          })
        );
      },
    },
    type: {
      type: String,
      default: 'text',
      validator(value) {
        return ['text', 'number', 'email', 'password', 'date'].includes(value);
      },
    },
  },
  computed: {
    inputListeners() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const vm = this;

      return {
        ...vm.$listeners,
        input: (event: Event) =>
          vm.$emit('input', (event.target as HTMLSelectElement).value),
        change: (event: Event) => {
          // debugger;
          const element = event.target as HTMLSelectElement;
          const selectedOptions = [...element.selectedOptions].map(
            (optionElement) => ({
              value: optionElement.value,
              label: optionElement.text,
            })
          );
          const value = element.multiple ? selectedOptions : selectedOptions[0];
          vm.$emit('change', value);
        },
      };
    },
  },
  methods: {
    isOptionSelected(optionValue: string | number) {
      if (this.multiple && Array.isArray(this.value)) {
        return this.value.some(
          (option) => String(option.value) === String(optionValue)
        );
      }

      return false;
      // return this.value
      //   ? String(this.value?.value) === String(optionValue)
      //   : false;
    },
    // emitWithLog(eventName: string, event: string) {
    //   console.log('Event: ', eventName, event);
    //   this.$emit(eventName, event);
    // }
    //   handleInput(event: Event) {
    //     const newValue = (event.target as HTMLInputElement).value;
    //
    //     const isValid =
    //       this.type !== 'number' ||
    //       (this.type === 'number' && !Number.isNaN(Number(newValue)));
    //
    //     console.log('isValid', [isValid, newValue, this.value]);
    //     this.$emit('input', isValid ? newValue : this.value);
    //   }
  },
});
</script>

<style scoped lang="scss">
select {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 1.75rem 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--input-color);
  vertical-align: middle;
  background: #fff
    url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e")
    no-repeat right 0.75rem center/8px 10px;
  border: 1px solid var(--input-border-color);
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  // Placeholder
  &::placeholder {
    color: var(--input-placeholder-color);
    // Override Firefox's unusual default opacity; see https://github.com/twbs/bootstrap/pull/11526.
    opacity: 1;
  }

  &[multiple] {
    height: auto;
    padding-right: 0.75rem;
    background-image: none;
  }

  // Disabled and read-only inputs
  //
  // HTML5 says that controls under a fieldset > legend:first-child won't be
  // disabled if the fieldset is disabled. Due to implementation difficulty, we
  // don't honor that edge case; we style them as disabled anyway.
  &:disabled,
  &[readonly] {
    background-color: var(--input-disabled-bg);
    // iOS fix for unreadable disabled content; see https://github.com/twbs/bootstrap/issues/11655.
    opacity: 1;
  }

  &:focus {
    color: var(--input-color);
    background-color: #fff;
    border-color: var(--input-focus-border-color);
    outline: 0;
    box-shadow: 0 0 0 0.2rem var(--input-focus-box-shadow);
  }
}
</style>
