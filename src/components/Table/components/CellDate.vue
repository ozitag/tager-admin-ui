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
      const date = this.column.format
              ? this.column.format({ row :this.row, column: this.column })
              : this.row[this.column.field];

      return date ? formatDate(new Date(date)) : '';
    }
  }
});
</script>

<style scoped lang="scss"></style>
