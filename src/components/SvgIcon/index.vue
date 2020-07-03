<template>
  <component :is="iconComponent"></component>
</template>

<script lang="js">
import Vue from 'vue';

import { ICON_MAP } from './SvgIcon.constants';

export default Vue.extend({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      validator(value) {
        return Object.keys(ICON_MAP).includes(value);
      },
      required: true
    }
  },
  data() {
    return {
      iconComponent: ICON_MAP[this.name]
    };
  }
});
</script>

<style scoped></style>
