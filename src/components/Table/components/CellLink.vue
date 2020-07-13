<template>
  <td>
    <component
      :is="shouldUseRouter ? 'router-link' : 'a'"
      v-if="Boolean(link)"
      :href="shouldUseRouter ? undefined : link.href"
      :to="shouldUseRouter ? link.href : undefined"
      v-bind="linkAttrs"
    >
      {{ link.label }}
    </component>
  </td>
</template>

<script lang="js">
import Vue from 'vue';
import get from 'lodash.get';
import { isAbsoluteUrl } from '@tager/admin-services';

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
    isAbsoluteLink() {
      return this.link ? isAbsoluteUrl(this.link.href) : false;
    },
    shouldUseRouter() {
      return this.column.shouldUseRouter ?? !this.isAbsoluteLink;
    },
    linkAttrs() {
      const shouldOpenNewTab = this.column.shouldOpenNewTab ?? !this.shouldUseRouter;

      return {
        target: shouldOpenNewTab ? '_blank' : undefined
      };
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
