<template>
  <td>
    <component
      :is="shouldUseRouter ? 'router-link' : 'a'"
      v-if="Boolean(link)"
      :href="shouldUseRouter ? undefined : link.url"
      :to="shouldUseRouter ? link.url : undefined"
      v-bind="linkAttrs"
    >
      {{ link.text }}
    </component>
  </td>
</template>

<script lang="js">
import Vue from 'vue';
import get from 'lodash.get';
import { isAbsoluteUrl } from '@tager/admin-services';
import { LinkSchema } from '../../../constants/schema';

function isLinkObject(value) {
  return LinkSchema.check(value);
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
          ? { url: value, text: value }
          : null;
    },
    isAbsoluteLink() {
      return this.link ? isAbsoluteUrl(this.link.url) : false;
    },
    shouldUseRouter() {
      return this.column.options?.shouldUseRouter ?? !this.isAbsoluteLink;
    },
    linkAttrs() {
      const shouldOpenNewTab = this.column.options?.shouldOpenNewTab ?? !this.shouldUseRouter;

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
