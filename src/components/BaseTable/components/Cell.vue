<script lang="ts">
import { defineComponent, h, type PropType, type Slot } from "vue";
import type { VNode } from "@vue/runtime-core";

import type {
  ColumnDefinition,
  RowDataDefaultType,
} from "../../../typings/common";

import CellDate from "./CellDate.vue";
import CellString from "./CellString.vue";
import CellImage from "./CellImage.vue";
import CellLink from "./CellLink.vue";
import CellHtml from "./CellHtml.vue";
import CellColor from "./CellColor.vue";
import CellName from "./CellName.vue";
import CellFile from "./CellFile.vue";
import CellKeyValue from "./CellKeyValue.vue";

interface Props {
  column: ColumnDefinition;
  row: RowDataDefaultType;
  rowIndex: number;
  scopedSlot: Slot | null;
}

export default defineComponent({
  name: "BaseCell",
  props: {
    column: {
      type: Object as PropType<Props["column"]>,
      required: true,
    },
    row: {
      type: Object as PropType<Props["row"]>,
      required: true,
    },
    rowIndex: {
      type: Number,
      required: true,
    },
    scopedSlot: {
      type: Function as PropType<Slot>,
      default: null,
    },
  },
  setup(props: Props) {
    const cellProps = {
      column: props.column,
      row: props.row,
      rowIndex: props.rowIndex,
    };

    const cellAttrs = {
      "data-table-body-cell": props.column.field,
    };

    const cellType =
      typeof props.column.type === "function"
        ? props.column.type(cellProps)
        : props.column.type;

    function appropriateCellComponent(): ReturnType<typeof defineComponent> {
      switch (cellType) {
        case "datetime":
        case "date":
          return CellDate;
        case "image":
          return CellImage;
        case "link":
          return CellLink;
        case "html":
          return CellHtml;
        case "color":
          return CellColor;
        case "name":
          return CellName;
        case "key-value":
          return CellKeyValue;
        case "file":
          return CellFile;

        default:
          return CellString;
      }
    }

    const scopedSlotNode = props.scopedSlot
      ? props.scopedSlot(cellProps)
      : null;

    const slotVNode = Array.isArray(scopedSlotNode)
      ? scopedSlotNode[0]
      : scopedSlotNode;

    function getCustomCellElement(children: VNode) {
      return props.column.useCustomDataCell
        ? children
        : h(
            "td",
            { style: props.column.style, class: props.column.class },
            children
          );
    }

    function renderFunction() {
      return slotVNode
        ? getCustomCellElement(slotVNode)
        : h(appropriateCellComponent(), {
            ...cellProps,
            attrs: cellAttrs,
            style: props.column.style,
            class: props.column.class,
          });
    }

    return renderFunction;
  },
});
</script>

<style scoped lang="scss">
td a {
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
}
</style>
