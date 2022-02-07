import { Ref } from 'vue';
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
      document.body.appendChild(popperRef.value);

      popperInstance = createPopper(
        referenceRef.value,
        popperRef.value,
        options
      );
    }
  }

  function destroy() {
    if (popperInstance && popperRef.value) {
      popperInstance.destroy();
      document.body.removeChild(popperRef.value);
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
