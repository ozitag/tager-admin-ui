<template>
  <td>
    <a v-if="Boolean(link)" :href="link && link.href">
      {{ link && link.label }}
    </a>
  </td>
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
    link() {
      return this.column.format
        ? this.column.format({ row: this.row, column: this.column, rowIndex: this.rowIndex })
        : this.row[this.column.field];
    },
  }
});
</script>

<style scoped lang="scss">
a {
  color: #007bff;

  &:hover {
    color: #0056b3;
    text-decoration: underline;
  }
}
</style>
