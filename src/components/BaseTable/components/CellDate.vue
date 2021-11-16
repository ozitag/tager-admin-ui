<template>
  <td>{{ value }}</td>
</template>

<script lang="js">
import Vue from 'vue';
import get from 'lodash.get';

import {formatDate, formatDateTime} from '../../../utils/common';

export default Vue.extend({
  props: {
    column: {
      type: Object,
      required: true
    },
    row: {
      type: Object,
      required: true
    },
    rowIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    value() {
      const date = this.column.format
          ? this.column.format({row: this.row, column: this.column, rowIndex: this.rowIndex})
          : get(this.row, this.column.field, null);

      if (!date) return ' ';

      if (this.column.type === 'date') {
        return formatDate(new Date(date));
      } else {
        const ignoreStartOfDayTime = this.column.options?.ignoreStartOfDayTime ?? true;
        return formatDateTime(new Date(date), ignoreStartOfDayTime);
      }
    }
  }
});
</script>

<style scoped lang="scss"></style>
