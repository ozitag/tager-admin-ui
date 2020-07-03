<template>
  <form-group>
    <input-label :for="id">{{ label }}</input-label>
    <div class="field-inner">
      <small class="base-url">{{ baseUrl }}</small>
      <base-input :id="id" :value="value" v-bind="$attrs" v-on="$listeners" />
    </div>
    <form-field-error v-if="Boolean(error)">
      {{ error }}
    </form-field-error>
  </form-group>
</template>

<script lang="js">
import Vue from 'vue';
import { isAbsoluteUrl } from '@tager/admin-services';

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
    urlPrefix: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: null,
    }
  },
  computed: {
    baseUrl() {
      return isAbsoluteUrl(this.urlPrefix)
        ? this.urlPrefix
        : document.location.origin + this.urlPrefix;
    }
  },
});
</script>

<style scoped lang="scss">
.field-inner {
  display: flex;
  align-items: center;
}

.base-url {
  margin-right: 10px;
}
</style>
