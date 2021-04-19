<script lang="js">
import Vue from 'vue';

import CellDate from './CellDate.vue';
import CellString from './CellString.vue';
import CellImage from './CellImage.vue';
import CellLink from './CellLink.vue';
import CellHtml from './CellHtml.vue';
import CellColor from './CellColor.vue';
import CellName from './CellName.vue';
import CellFile from './CellFile.vue';

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
      rowIndex: this.rowIndex,
    };

    const cellAttrs = {
      'data-table-body-cell': this.column.field
    }

    const cellType = typeof this.column.type === 'function'
      ? this.column.type(cellProps)
      : this.column.type;

    function appropriateCellComponent() {
      switch (cellType) {
        case 'datetime':
        case 'date':
          return CellDate;
        case 'image':
          return CellImage;
        case 'link':
          return CellLink;
        case 'html':
          return CellHtml;
        case 'color':
          return CellColor;
        case 'name':
          return CellName;
        case 'file':
          return CellFile;

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
            attrs: cellAttrs,
            style: this.column.style,
            class: this.column.class,
          })
    );
  }
});
</script>

<style scoped></style>
