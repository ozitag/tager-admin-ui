<template>
  <td>{{ value }}</td>
</template>

<script lang="js">
import Vue from 'vue';

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
      return this.column.format
        ? this.column.format({ row: this.row, column: this.column, rowIndex: this.rowIndex })
        : this.row[this.column.field];
    }
  }
});
</script>

<style scoped lang="scss"></style>
