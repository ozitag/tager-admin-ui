import { onMounted, Ref, ref } from '@vue/composition-api';
import { LocalStorageService } from '../utils/common';

function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [Ref<T>, (value: T) => void] {
  const storedValue = ref<T>(defaultValue) as Ref<T>;
  const storageService = new LocalStorageService<T>(key, defaultValue);

  onMounted(() => {
    storedValue.value = storageService.get();
  });

  function setValue(value: T): void {
    storageService.set(value);
    storedValue.value = storageService.get();
  }

  return [storedValue, setValue];
}

export default useLocalStorage;
