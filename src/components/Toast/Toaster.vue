<template>
  <div class="toasts-container">
    <div class="toasts-inner">
      <toast
        v-for="toast of toastList"
        :key="toast.id"
        :toast="toast"
        @hide="hideToast(toast.id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api';

import Toast from './Toast.vue';
import { EventBus } from './Toast.helpers';
import { ToastItem } from '../../../typings';

export default defineComponent({
  name: 'Toasts',
  components: { Toast },
  setup() {
    const toastList = ref<Array<ToastItem>>([]);

    onMounted(() => {
      EventBus.$on('toast-show', (newToast: ToastItem) => {
        toastList.value.push(newToast);
      });
    });

    function hideToast(toastId: number) {
      toastList.value = toastList.value.filter((toast) => toast.id !== toastId);
    }

    return {
      toastList,
      hideToast,
    };
  },
});
</script>

<style scoped lang="scss">
.toasts-container {
  position: fixed;
  left: 0.5rem;
  right: 0.5rem;
  top: 0.5rem;
  z-index: 1100;
}

.toasts-inner {
  position: absolute;
  max-width: 350px;
  width: 100%;
  left: 0;
  right: 0;
  margin-left: auto;
}
</style>
