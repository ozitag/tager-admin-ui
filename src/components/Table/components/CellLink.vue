<template>
  <td>
    <a v-if="Boolean(link)" :href="link && link.href" v-bind="linkAttrs">
      {{ link && link.label }}
    </a>
  </td>
</template>

<script lang="js">
import Vue from 'vue';
import get from 'lodash.get';

function isLinkObject(value) {
  return typeof value === 'object'
    && value !== null
    && typeof value.href === 'string'
    && typeof value.label === 'string';
}

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
      const value = this.column.format
        ? this.column.format({ row: this.row, column: this.column, rowIndex: this.rowIndex })
        : get(this.row, this.column.field, null);

      return isLinkObject(value)
        ? value
        : typeof value === 'string' && value.trim()
          ? { href: value, label: value }
          : null;
    },
    linkAttrs() {
      const shouldOpenNewTab = Object.keys(this.column).includes('shouldOpenNewTab')
        ? Boolean(this.column.shouldOpenNewTab)
        : true;

      return {
        target: shouldOpenNewTab ? '_blank' : undefined
      };
    }
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
