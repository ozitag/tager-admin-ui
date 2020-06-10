<template>
  <td>{{ value }}</td>
</template>

<script lang="js">
import Vue from 'vue';

import { formatDate } from '@/utils/common';

export default Vue.extend({
  props: {
    column: {
      type: Object,
      required: true
    },
    row: {
      type: Object,
      required: true
    }
  },
  computed: {
    value() {
      return formatDate(new Date(this.row[this.column.field]));
    }
  }
});
</script>

<style scoped lang="scss"></style>
