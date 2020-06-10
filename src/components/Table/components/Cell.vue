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
    scopedSlot: {
      type: Function
    }
  },
  render(createElement) {
    const cellType = this.column.type;

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
      ? this.scopedSlot({
          row: this.row,
          column: this.column
        })
      : null;

    const slotVNode = Array.isArray(scopedSlotNode)
      ? scopedSlotNode[0]
      : scopedSlotNode;

    return (
      slotVNode ??
      createElement(appropriateCellComponent(), {
        props: {
          row: this.row,
          column: this.column
        }
      })
    );
  }
});
</script>

<style scoped></style>
