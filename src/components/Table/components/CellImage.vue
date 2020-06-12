<template>
  <td>
    <div class="cell-inner" v-if="Boolean(value)">
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
    }
  },
  computed: {
    value() {
      return this.column.format
              ? this.column.format({ row: this.row, column: this.column })
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
  height: 100px;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
