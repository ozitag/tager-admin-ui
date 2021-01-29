import {
  computed,
  ComputedRef,
  onMounted,
  onUnmounted,
  Ref,
  ref,
} from '@vue/composition-api';
import { getScrollableParent } from './BaseTable.utils';

export function useStickyTableHeader(params: {
  isEnabled: boolean;
}): {
  tableRef: Ref<HTMLTableElement | null>;
  trRef: Ref<HTMLTableRowElement | null>;
  isSticky: ComputedRef<boolean>;
  headRowStyle: ComputedRef<{ [key: string]: string }>;
} {
  const scrollContainerRef = ref<HTMLElement | null>(null);
  const tableRef = ref<HTMLTableElement | null>(null);
  const trRef = ref<HTMLTableRowElement | null>(null);
  const scrollTop = ref<number>(0);

  const isSticky = computed(() =>
    params.isEnabled ? scrollTop.value > 0 : false
  );

  const headRowStyle = computed(() => {
    const translateY = isSticky.value ? scrollTop.value - 1 : 0;
    return {
      transform: `translate(0px, ${translateY}px)`,
    };
  });

  function handleScroll() {
    if (!scrollContainerRef.value || !tableRef.value) return;

    const containerRect = scrollContainerRef.value.getBoundingClientRect();
    const tableRect = tableRef.value.getBoundingClientRect();

    const isVisible =
      tableRect.top <= containerRect.top &&
      tableRect.bottom >= containerRect.top;

    if (!isVisible) return;

    scrollTop.value = containerRect.top - tableRect.top;
  }

  onMounted(() => {
    if (!params.isEnabled) return;

    scrollContainerRef.value = getScrollableParent(trRef.value);

    if (scrollContainerRef.value) {
      handleScroll();
      scrollContainerRef.value.addEventListener('scroll', handleScroll);
    }
  });

  onUnmounted(() => {
    if (!params.isEnabled) return;

    if (scrollContainerRef.value) {
      scrollContainerRef.value.removeEventListener('scroll', handleScroll);
    }
  });

  return { tableRef, trRef, isSticky, headRowStyle };
}
