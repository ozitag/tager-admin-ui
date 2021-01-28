import {
  computed,
  ComputedRef,
  onMounted,
  onUnmounted,
  reactive,
  Ref,
  ref,
} from '@vue/composition-api';

export function useStickyTableHeader(
  defaultSticky = false
): { tableRef: Ref<HTMLTableElement | null>; isSticky: Ref<boolean> } {
  const isSticky = ref<boolean>(defaultSticky);
  const tableRef = ref<HTMLTableElement | null>(null);

  const state = reactive({
    height: 0,
    width: 0,
  });

  const targetStyle = computed(() => {
    return {
      height: `${state.height}px`,
      width: `${state.width}px`,
    };
  });

  function updateState() {
    if (tableRef.value) {
      const tableRect = tableRef.value.getBoundingClientRect();

      state.width = tableRect.width;
      state.height = tableRect.height;

      tableRef.value.style.width = tableRect.width + 'px';
      tableRef.value.style.height = tableRect.height + 'px';
    }
  }

  function handleScroll() {
    if (tableRef.value) {
      const { top, bottom } = tableRef.value.getBoundingClientRect();

      if (top <= 0 && bottom > 2 * 68) {
        if (!isSticky.value) {
          isSticky.value = true;
          updateState();
        }
      } else {
        if (isSticky.value) {
          isSticky.value = false;
        }
      }
    }
  }

  const isScrollable = function (ele) {
    const hasScrollableContent = ele.scrollHeight > ele.clientHeight;

    const overflowYStyle = window.getComputedStyle(ele).overflowY;
    const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1;

    return hasScrollableContent && !isOverflowHidden;
  };

  const getScrollableParent = function (ele) {
    return !ele || ele === document.body
      ? document.body
      : isScrollable(ele)
      ? ele
      : getScrollableParent(ele.parentNode);
  };

  onMounted(() => {
    if (tableRef.value) {
      getScrollableParent(tableRef.value).addEventListener(
        'scroll',
        handleScroll
      );
    }
  });

  onUnmounted(() => {
    if (tableRef.value) {
      getScrollableParent(tableRef.value).removeEventListener(
        'scroll',
        handleScroll
      );
    }
  });

  return { tableRef, isSticky, targetStyle };
}
