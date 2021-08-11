<template>
  <td>
    <router-link
      v-if="Boolean(link) && shouldUseRouter"
      :to="link.url"
      v-bind="linkAttrs"
    >
      {{ link.text }}
    </router-link>

    <div v-if="Boolean(link) && !shouldUseRouter" class="url">
      <a :href="link.url" v-bind="linkAttrs">
        {{ link.text }}
      </a>
      <BaseButton
        variant="icon"
        title="Copy to clipboard"
        @click="handleCopy(link.url)"
      >
        <SvgIcon v-if="!isCopied" name="contentCopy" class="icon-copy" />
        <SvgIcon v-else name="done" class="icon-copy" />
      </BaseButton>
    </div>
  </td>
</template>

<script lang="js">
import Vue from 'vue';
import get from 'lodash.get';
import {isAbsoluteUrl} from '@tager/admin-services';
import {LinkSchema} from '../../../constants/schema';
import useCopyToClipboard from "../../../hooks/useCopyToClipboard";
import SvgIcon from "../../SvgIcon/SvgIcon";
import BaseButton from "../../BaseButton/BaseButton";

function isLinkObject(value) {
  return LinkSchema.check(value);
}

export default Vue.extend({
  name: 'CellLink',
  components: {SvgIcon, BaseButton},
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
          ? this.column.format({row: this.row, column: this.column, rowIndex: this.rowIndex})
          : get(this.row, this.column.field, null);

      return isLinkObject(value)
          ? value
          : typeof value === 'string' && value.trim()
              ? {url: value, text: value}
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
  },
  setup() {
    const [isCopied, handleCopy] = useCopyToClipboard(500);

    return {
      isCopied,
      handleCopy
    }
  }
});
</script>

<style scoped lang="scss">
.url {
  button {
    padding: 0.25rem;
  }

  svg {
    width: 14px;
    height: 14px;
  }
}

a {
  color: #007bff;

  &:hover {
    color: #0056b3;
    text-decoration: underline;
  }
}
</style>
