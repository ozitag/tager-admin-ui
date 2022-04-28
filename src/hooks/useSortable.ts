import Sortable from "sortablejs";
import { onBeforeUnmount, onMounted, watch } from "vue";
import type { Ref } from "vue";

import { isNumber } from "@tager/admin-services";

export function useSortable<T>(params: {
  elementRef: Ref<HTMLElement | null>;
  entityList: Ref<Array<T>>;
  onChange: (entityList: Array<T>) => void;
  options?: Sortable.Options;
}) {
  const { elementRef, entityList, onChange, options } = params;
  let sortable: Sortable | null = null;

  function handleDragEnd(fromIndex: number, toIndex: number) {
    const movedElement = entityList.value[fromIndex];
    const entityListCopy = [...entityList.value];
    entityListCopy.splice(fromIndex, 1);
    entityListCopy.splice(toIndex, 0, movedElement);
    onChange(entityListCopy);
  }

  function initSortable() {
    if (!elementRef.value) return;

    sortable = new Sortable(elementRef.value, {
      animation: 200,
      onEnd: (event) => {
        if (!isNumber(event.oldIndex) || !isNumber(event.newIndex)) return;

        handleDragEnd(event.oldIndex, event.newIndex);
      },
      ...options,
    });
  }

  function destroySortable() {
    if (sortable) {
      sortable.destroy();
    }
  }

  watch(elementRef, () => {
    if (elementRef.value) {
      initSortable();
    } else {
      destroySortable();
    }
  });

  onMounted(initSortable);
  onBeforeUnmount(destroySortable);
}
