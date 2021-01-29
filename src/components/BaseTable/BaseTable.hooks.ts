import {
  computed,
  ComputedRef,
  onMounted,
  onUnmounted,
  Ref,
  ref,
} from '@vue/composition-api';
import { getScrollableParent } from './BaseTable.utils';

export function useStickyTableHeader(): {
  tableRef: Ref<HTMLTableElement | null>;
  trRef: Ref<HTMLTableRowElement | null>;
  isSticky: Ref<boolean>;
  thStyle: ComputedRef<{ [key: string]: string }>;
} {
  const scrollContainerRef = ref<HTMLElement | null>(null);
  const tableRef = ref<HTMLTableElement | null>(null);
  const trRef = ref<HTMLTableRowElement | null>(null);
  const isSticky = ref<boolean>(false);
  const scrollTop = ref<number>(0);

  const thStyle = computed(() => ({
    transform: `translate(0px, ${isSticky.value ? scrollTop.value : 0}px)`,
  }));

  function handleScroll() {
    if (scrollContainerRef.value && tableRef.value) {
      const containerRect = scrollContainerRef.value.getBoundingClientRect();
      const tableRect = tableRef.value.getBoundingClientRect();

      window.requestAnimationFrame(() => {
        if (
          tableRect.top <= containerRect.top &&
          tableRect.bottom >= containerRect.top
        ) {
          if (!isSticky.value) {
            isSticky.value = true;
          }
        } else {
          if (isSticky.value) {
            isSticky.value = false;
          }
        }
      });

      scrollTop.value = containerRect.top - tableRect.top;
    }
  }

  onMounted(() => {
    if (trRef.value) {
      scrollContainerRef.value = getScrollableParent(trRef.value);
    }

    if (scrollContainerRef.value) {
      scrollContainerRef.value.addEventListener('scroll', handleScroll);
    }
  });

  onUnmounted(() => {
    if (scrollContainerRef.value) {
      scrollContainerRef.value.removeEventListener('scroll', handleScroll);
    }
  });

  return { tableRef, trRef, isSticky, thStyle };
}
