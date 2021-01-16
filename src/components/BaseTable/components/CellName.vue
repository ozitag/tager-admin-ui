<template>
  <td class="name-cell">
    <div v-if="state" class="name-wrap">
      <div class="name-block">
        <span v-if="!state.adminLink.url" class="name">
          {{ state.adminLink.text }}
        </span>
        <component
          :is="shouldUseRouter ? 'router-link' : 'a'"
          v-else
          class="name-link"
          :href="shouldUseRouter ? undefined : state.adminLink.url"
          :to="shouldUseRouter ? state.adminLink.url : undefined"
          v-bind="linkAttrs"
        >
          {{ state.adminLink.text }}
        </component>
      </div>

      <div v-if="state.websiteLink && state.websiteLink.text" class="url-block">
        <span class="label">Web URL:</span>
        <a class="url" :href="state.websiteLink.url" target="_blank">
          {{ websiteLabel }}
        </a>
      </div>
    </div>
  </td>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import get from 'lodash.get';
import { isAbsoluteUrl, isString, z } from '@tager/admin-services';
import { ColumnDefinitionName } from '../../../typings/common';
import { RowDataDefaultType } from '../../../../typings';
import { LinkSchema } from '../../../constants/schema';
import { isValidURL } from '../../../utils/common';

const NameCellValueObjectSchema = z.object({
  adminLink: LinkSchema,
  websiteLink: LinkSchema.nullable(),
});

const NameCelValueSchema = z.union([
  /** from `format(...)` */
  NameCellValueObjectSchema,
  /** from `field` */
  z.string(),
  z.null(),
]);

type NameCellValueType = z.infer<typeof NameCelValueSchema>;
type NameCellValueObjectType = z.infer<typeof NameCellValueObjectSchema>;

function isValidNameCellValue(value: unknown): value is NameCellValueType {
  return NameCelValueSchema.check(value);
}

interface Props {
  column: ColumnDefinitionName;
  row: RowDataDefaultType;
  rowIndex: number;
}

export default defineComponent<Props>({
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
    const state = computed<NameCellValueObjectType | null>(() => {
      const value = props.column.format
        ? props.column.format({
            row: props.row,
            column: props.column,
            rowIndex: props.rowIndex,
          })
        : get(props.row, props.column.field, null);

      if (!isValidNameCellValue(value) || !value) return null;

      /** from `field` */
      if (isString(value)) {
        return { adminLink: { text: value, url: '' }, websiteLink: null };
      }

      return value;
    });

    const shouldUseRouter = computed<boolean>(() => {
      const isAbsoluteLink = state
        ? isAbsoluteUrl(state.value?.adminLink.url ?? '')
        : false;

      return props.column.options?.shouldUseRouter ?? !isAbsoluteLink;
    });

    const linkAttrs = computed<{ target: string | undefined }>(() => {
      const shouldOpenNewTab =
        props.column.options?.shouldOpenNewTab ?? !shouldUseRouter;

      return {
        target: shouldOpenNewTab ? '_blank' : undefined,
      };
    });

    const websiteLabel = computed<string>(() => {
      const url = state.value?.websiteLink?.url;
      if (url) {
        if (isValidURL(url)) {
          const urlObj = new URL(url);
          return urlObj.pathname;
        }
        return url;
      }
      return '';
    });

    return { linkAttrs, shouldUseRouter, state, websiteLabel };
  },
});
</script>

<style scoped lang="scss">
.name-cell {
  height: 100%;
  padding: 0;
}

.name-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.name-block {
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  padding: 0.75rem;
  font-weight: bold;

  .name {
  }

  .name-link {
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
  border-top: 1px solid #eee;
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
