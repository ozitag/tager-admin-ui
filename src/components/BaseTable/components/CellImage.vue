<template>
  <td class="image-cell">
    <div v-if="Boolean(value)" class="cell-inner">
      <div class="image-wrapper">
        <loadable-image
          :src="value"
          alt="Photo"
          style="height: 100px; min-width: 100px; object-fit: contain"
        />
      </div>
    </div>
  </td>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import get from 'lodash.get';

import LoadableImage from '../../LoadableImage/index.vue';
import { ColumnDefinition, RowDataDefaultType } from '../../../typings/common';

interface Props {
  column: ColumnDefinition;
  row: RowDataDefaultType;
  rowIndex: number;
}

export default defineComponent<Props>({
  name: 'CellImage',
  components: { LoadableImage },
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
    const value = computed(() => {
      return props.column.format
        ? props.column.format({
            row: props.row,
            column: props.column,
            rowIndex: props.rowIndex,
          })
        : get(props.row, props.column.field, null);
    });

    return {
      value,
    };
  },
});
</script>

<style scoped lang="scss">
td.image-cell {
  padding: 5px;

  .cell-inner {
    position: relative;
    min-width: 100px;
    height: 100px;
  }

  .image-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: flex;
    justify-content: center;
  }
}
</style>
