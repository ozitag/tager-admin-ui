import { Ref } from '@vue/composition-api';
import {
  createPopper,
  Instance,
  Modifier,
  OptionsGeneric,
} from '@popperjs/core';

type PopperHookOptions = Partial<
  OptionsGeneric<Partial<Modifier<string, { offset: number[] }>>>
>;

function usePopper(
  referenceRef: Ref<Element | null>,
  popperRef: Ref<HTMLElement | null>,
  options?: PopperHookOptions
): {
  show: () => void;
  hide: () => void;
} {
  let popperInstance: Instance | null = null;

  function create() {
    if (referenceRef.value && popperRef.value) {
      popperInstance = createPopper(
        referenceRef.value,
        popperRef.value,
        options
      );
    }
  }

  function destroy() {
    if (popperInstance) {
      popperInstance.destroy();
      popperInstance = null;
    }
  }

  function show() {
    create();
  }

  function hide() {
    destroy();
  }

  return { show, hide };
}

export default usePopper;
