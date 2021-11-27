<template>
  <td class="key-value-cell">
    <ul :v-if="value">
      <li v-for="item in value" :key="item.key">
        <span>{{ item.key }}:</span>
        <span>{{ item.value }}</span>
      </li>
    </ul>
  </td>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api';
import {ColumnDefinitionKeyValue} from '../../../typings/common';
import {RowDataDefaultType} from '../../../../typings';
import get from "lodash.get";

interface Props {
  column: ColumnDefinitionKeyValue;
  row: RowDataDefaultType;
  rowIndex: number;
}

export default defineComponent<Props>({
  name: 'CellKeyValue',
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
    const value = props.column.format ? props.column.format({
      row: props.row,
      column: props.column,
      rowIndex: props.rowIndex,
    }) : get(props.row, props.column.field, null);

    return {
      value
    };
  },
});
</script>

<style scoped lang="scss">
.key-value-cell {
  li {
    margin-top: 5px;

    &:first-child {
      margin-top: 0;
    }

    span:first-child {
      font-weight: bold;
      display: block;
    }
  }
}
</style>
