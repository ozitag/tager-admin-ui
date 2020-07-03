<template>
  <td>
    <div v-if="Boolean(value)" class="cell-inner">
      <div class="image-wrapper">
        <img :src="value" alt="Photo" />
      </div>
    </div>
  </td>
</template>

<script lang="js">
import Vue from 'vue';

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
        : this.row[this.column.field];
    }
  }
});
</script>

<style scoped lang="scss">
td {
  padding: 0;
  text-align: center;
}

.cell-inner {
  display: flex;
  justify-content: center;
}

.image-wrapper {
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
img {
  min-height: 100px;
  margin: 5px 0;
  object-fit: cover;
}
</style>
