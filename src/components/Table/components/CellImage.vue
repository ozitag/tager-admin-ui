<template>
  <td class="image-cell">
    <div v-if="Boolean(value)" class="cell-inner">
      <loadable-image
        :src="value"
        alt="Photo"
        style="height: 100px; min-width: 100px; object-fit: contain;"
        loading-container-style="width: 100px"
      />
    </div>
  </td>
</template>

<script lang="js">
import Vue from 'vue';
import get from 'lodash.get';

import LoadableImage from '../../LoadableImage';

export default Vue.extend({
  components: { LoadableImage },
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
    value() {
      return this.column.format
        ? this.column.format({ row: this.row, column: this.column, rowIndex: this.rowIndex })
        : get(this.row, this.column.field, null);
    }
  }
});
</script>

<style scoped lang="scss">
td.image-cell {
  padding: 0;

  .cell-inner {
    padding: 5px;
  }
}
</style>
