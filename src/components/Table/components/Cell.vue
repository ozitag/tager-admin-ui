<script lang="js">
import Vue from 'vue';

import CellDate from './CellDate.vue';
import CellString from './CellString.vue';
import CellImage from './CellImage.vue';
import CellLink from './CellLink.vue';

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
      required: true,
    },
    scopedSlot: {
      type: Function,
      default: null,
    }
  },
  render(createElement) {
    const cellProps = {
      column: this.column,
      row: this.row,
      rowIndex: this.rowIndex
    };

    const cellType = typeof this.column.type === 'function'
      ? this.column.type(cellProps)
      : this.column.type;

    function appropriateCellComponent() {
      switch (cellType) {
        case 'date':
          return CellDate;
        case 'image':
          return CellImage;
        case 'link':
          return CellLink;

        default:
          return CellString;
      }
    }

    const scopedSlotNode = this.scopedSlot
      ? this.scopedSlot(cellProps)
      : null;

    const slotVNode = Array.isArray(scopedSlotNode)
      ? scopedSlotNode[0]
      : scopedSlotNode;

    const customCellElement = this.column.useCustomDataCell
      ? scopedSlotNode
      : createElement('td', { style: this.column.style, class: this.column.class }, scopedSlotNode);

    return (
      slotVNode
        ? customCellElement
        : createElement(appropriateCellComponent(), {
            props: cellProps,
            style: this.column.style,
            class: this.column.class,
          })
    );
  }
});
</script>

<style scoped></style>
