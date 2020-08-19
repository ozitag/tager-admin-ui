<template>
  <form-group>
    <input-label :for="id">{{ label }}</input-label>
    <div class="field-inner">
      <span ref="measureText" class="measure">{{ value }}</span>
      <small>{{ urlParts[0] }}</small>
      <base-input
        :id="id"
        :style="inputStyle"
        :value="value"
        v-bind="$attrs"
        class="alias-input"
        v-on="$listeners"
      />
      <small>{{ urlParts[1] }}</small>
    </div>
    <form-field-error v-if="Boolean(error)">
      {{ error }}
    </form-field-error>
  </form-group>
</template>

<script lang="js">
import Vue from 'vue';

import FormGroup from '../FormGroup';
import FormFieldError from '../FormFieldError';
import InputLabel from '../InputLabel';
import BaseInput from '../BaseInput';

export default Vue.extend({
  name: 'FormFieldUrlAliasInput',
  components: {
    FormGroup, FormFieldError, InputLabel, BaseInput,
  },
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: null,
    },
    urlTemplate: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: null,
    }
  },
  data() {
    return { inputStyle: {} };
  },
  computed: {
    urlParts() {
      const templateVar = '{alias}';
      const index = this.urlTemplate.indexOf(templateVar);

      if (index === -1) return [this.urlTemplate];

      return [this.urlTemplate.slice(0, index), this.urlTemplate.slice(index + templateVar.length)];
    }
  },
  mounted() {
    const vm = this;

    function updateInputWidth() {
      const newWidth = vm.$refs.measureText.offsetWidth;
      vm.inputStyle = { width: newWidth + 2 + 'px' };
    }

    vm.mutationObserver = new MutationObserver(() => {
      if (vm.$refs.measureText) {
        updateInputWidth(vm.$refs.measureText.offsetWidth);
      }
    })

    vm.intersectionObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.intersectionRatio === 1) {
        updateInputWidth();
      }
    })

    if (vm.$refs.measureText) {
      vm.mutationObserver.observe(vm.$refs.measureText, { subtree: true,  characterData: true });
      vm.intersectionObserver.observe(vm.$refs.measureText);
      updateInputWidth();
    }
  },
  beforeDestroy() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }
});
</script>

<style scoped lang="scss">
.field-inner {
  position: relative;
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.measure {
  pointer-events: none;
  position: absolute;
  opacity: 0;
  padding: 0.375rem 0.75rem;
  border: 1px solid var(--input-border-color);
}

.alias-input {
  width: auto;
}
</style>
