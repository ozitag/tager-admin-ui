<template>
  <td class="name-cell">
    <div class="name-wrap">
      <div class="name-block">
        <component
          :is="shouldUseRouter ? 'router-link' : 'a'"
          class="name"
          :href="shouldUseRouter ? undefined : state.adminLink.url"
          :to="shouldUseRouter ? state.adminLink.text : undefined"
          v-bind="linkAttrs"
        >
          {{ state.adminLink.text }}
        </component>
      </div>

      <div v-if="Boolean(state.websiteUrl)" class="url-block">
        <span class="label">Web URL:</span>
        <a class="url" :href="state.websiteUrl.url" target="_blank">
          {{ state.websiteUrl.text }}
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

const LinkSchema = z.object({ url: z.string(), text: z.string() });

const NameCelValueObjectSchema = z.object({
  adminLink: LinkSchema.nullable(),
  websiteUrl: LinkSchema.nullable(),
});

const NameCelValueSchema = z.union([
  NameCelValueObjectSchema,
  z.string(),
  z.null(),
]);

type NameCellValueType = z.infer<typeof NameCelValueSchema>;
type NameCellValueObjectType = z.infer<typeof NameCelValueObjectSchema>;

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

      if (isString(value)) {
        return { adminLink: { text: value, url: '' }, websiteUrl: null };
      } else {
        return {
          adminLink: value.adminLink,
          websiteUrl: value.websiteUrl,
        };
      }
    });

    const shouldUseRouter = computed<boolean>(() => {
      const isAbsoluteLink = state
        ? isAbsoluteUrl(state.value?.adminLink?.url ?? '')
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
