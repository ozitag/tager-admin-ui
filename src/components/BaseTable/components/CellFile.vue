<template>
  <td>
    <a v-if="file" class="file-link" :href="file.url" target="_blank">
      <div>
        <SvgIcon :name="getFileIconName(file)" />
      </div>
      <span>{{ file.name }}</span>
    </a>
  </td>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { FileType, Nullable } from '@tager/admin-services';
import get from 'lodash.get';

import { getFileIconName } from '../../FileInput/FileInput.helpers';
import SvgIcon from '../../SvgIcon';
import {
  ColumnDefinitionFile,
  RowDataDefaultType,
} from '../../../typings/common';

interface Props {
  column: ColumnDefinitionFile;
  row: RowDataDefaultType;
  rowIndex: number;
}

export default defineComponent<Props>({
  name: 'CellFile',
  components: { SvgIcon },
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
  setup(props: Props) {
    const file = computed<Nullable<FileType>>(() => {
      return props.column.format
        ? props.column.format({
            row: props.row,
            column: props.column,
            rowIndex: props.rowIndex,
          })
        : get(props.row, props.column.field, null);
    });

    return { file, getFileIconName };
  },
});
</script>

<style lang="scss" scoped>
.file-link {
  max-width: 150px;
  overflow: hidden;
  display: block;
  text-align: center;
  text-overflow: ellipsis;
}
</style>
