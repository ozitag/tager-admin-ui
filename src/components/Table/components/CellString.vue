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
    }
  },
  computed: {
    value() {
      const value = this.row[this.column.field];

      return this.column.format
        ? this.column.format(value, this.row, this.column)
        : value;
    }
  }
});
</script>

<style scoped lang="scss"></style>
