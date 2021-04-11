import { onUnmounted, ref, Ref, watch } from '@vue/composition-api';

function useCopyToClipboard(
  timeout = 300
): [Ref<boolean>, (text: string) => void] {
  const isCopied = ref<boolean>(false);

  function handleCopy(text: string): void {
    window.navigator.clipboard
      .writeText(text)
      .then(() => {
        isCopied.value = true;
      })
      .catch(console.error);
  }

  let timeoutId: number | undefined;

  watch(isCopied, (newIsCopied) => {
    if (newIsCopied) {
      timeoutId = setTimeout(() => {
        isCopied.value = false;
      }, timeout);
    }
  });

  onUnmounted(() => {
    clearTimeout(timeoutId);
  });

  return [isCopied, handleCopy];
}

export default useCopyToClipboard;
