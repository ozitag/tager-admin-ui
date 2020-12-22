<template>
  <td class="name-cell">
    <div class="name-wrap">
      <div v-if="Boolean(state.name)" class="name-block">
        <component
          :is="shouldUseRouter ? 'router-link' : 'a'"
          class="name"
          :href="shouldUseRouter ? undefined : state.name.url"
          :to="shouldUseRouter ? state.name.text : undefined"
          v-bind="linkAttrs"
        >
          {{ state.name.text }}
        </component>
      </div>

      <div v-if="Boolean(state.webURL)" class="url-block">
        <span class="label">Web URL:</span>
        <a class="url" :href="state.webURL" target="_blank">
          {{ state.webURL }}
        </a>
      </div>
    </div>
  </td>
</template>

<script lang="js">
import { defineComponent, computed } from '@vue/composition-api';
import get from 'lodash.get';
import { isAbsoluteUrl } from '@tager/admin-services';

function isNameObject(value) {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.name === 'object' &&
    typeof value.name.url === 'string' &&
    typeof value.name.text === 'string' &&
    typeof value.webURL === 'string'
  );
}

export default defineComponent({
  name: 'CellName',
  props: {
    column: {
      type: Object,
      required: true,
    },
    row: {
      type: Object,
      required: true,
    },
    rowIndex: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const state = computed(() => {
      const value = props.column.format
        ? props.column.format({
            row: props.row,
            column: props.column,
            rowIndex: props.rowIndex,
          })
        : get(props.row, props.column.field, null);

      return isNameObject(value)
        ? value
        : typeof value === 'string' && value.trim()
        ? { name: { text: value, url: value }, webURL: null }
        : null;
    });

    const isAbsoluteLink = computed(() => {
      return state ? isAbsoluteUrl(state.name.url) : false;
    });

    const shouldUseRouter = computed(() => {
      return props.column.options?.shouldUseRouter ?? !isAbsoluteLink;
    });

    const linkAttrs = computed(() => {
      const shouldOpenNewTab =
        props.column.options?.shouldOpenNewTab ?? !shouldUseRouter;

      return {
        target: shouldOpenNewTab ? '_blank' : undefined,
      };
    });

    return { linkAttrs, shouldUseRouter, state };
  },
});
</script>

<style scoped lang="scss">
.name-cell {
  height: 1px;
}

.name-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.name-block {
  flex: 1 1 1px;
  display: flex;
  align-items: center;
  margin-top: -0.75rem;

  .name {
    font-weight: bold;
    color: #007bff;

    &:hover {
      color: #0056b3;
      text-decoration: underline;
    }
  }
}

.url-block {
  font-size: 13px;
  margin-top: auto;
  border-top: 1px solid #eee;
  margin: auto -0.75rem -0.75rem;
  padding: 0.5rem 0.75rem;

  .label {
    display: block;
  }

  .url {
    color: #007bff;

    &:hover {
      color: #0056b3;
      text-decoration: underline;
    }
  }
}
</style>
