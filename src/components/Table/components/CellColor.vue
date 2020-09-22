<template>
  <td>
    <template v-if="value">
      <div class="color-cell">
        <div class="color-cell-inner" :style="{ backgroundColor: value }" />
      </div>
      <span class="color-value">{{ value }}</span>
    </template>
  </td>
</template>

<script lang="js">
import Vue from 'vue';
import get from 'lodash.get';

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
    value() {
      return this.column.format
        ? this.column.format({ row: this.row, column: this.column, rowIndex: this.rowIndex })
        : get(this.row, this.column.field, null);
    }
  }
});
</script>

<style scoped lang="scss">
.color-cell {
  display: inline-block;
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.color-cell-inner {
  border-radius: 3px;
  height: 1.8rem;
  width: 3.2rem;
}

.color-value {
  display: block;
}
</style>
