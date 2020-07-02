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

<script lang="js">
import Vue from 'vue';
import Toast from './Toast.vue';
import { EventBus } from './Toast.helpers';

export default Vue.extend({
  name: 'Toasts',
  components: { Toast },
  data() {
    return {
      toastList: []
    };
  },
  mounted() {
    EventBus.$on('toast-show', (newToast) => {
      this.toastList.push(newToast);
    });
  },
  methods: {
    hideToast(toastId) {
      this.toastList = this.toastList.filter(toast => toast.id !== toastId);
    }
  }
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
