import Toast from './Toast.vue';
import { defineComponent, ref } from '@vue/composition-api';
import { ToastParams } from '../../typings/common';

export default { title: 'Toast' };

export const Primary = () =>
  defineComponent({
    components: { Toast },
    setup() {
      const toast = ref<ToastParams>({
        variant: 'primary',
        title: 'Toast title',
        body: 'Toast body',
      });

      return {
        toast,
      };
    },
    template: `
      <Toast :toast="toast"/>`,
  });

export const Secondary = () =>
  defineComponent({
    components: { Toast },
    setup() {
      const toast = ref<ToastParams>({
        variant: 'secondary',
        title: 'Toast title',
        body: 'Toast body',
      });

      return {
        toast,
      };
    },
    template: `
      <Toast :toast="toast"/>`,
  });

export const Success = () =>
  defineComponent({
    components: { Toast },
    setup() {
      const toast = ref<ToastParams>({
        variant: 'success',
        title: 'Toast title',
        body: 'Toast body',
      });

      return {
        toast,
      };
    },
    template: `
      <Toast :toast="toast"/>`,
  });

export const Info = () =>
  defineComponent({
    components: { Toast },
    setup() {
      const toast = ref<ToastParams>({
        variant: 'info',
        title: 'Toast title',
        body: 'Toast body',
      });

      return {
        toast,
      };
    },
    template: `
      <Toast :toast="toast"/>`,
  });

export const Warning = () =>
  defineComponent({
    components: { Toast },
    setup() {
      const toast = ref<ToastParams>({
        variant: 'warning',
        title: 'Toast title',
        body: 'Toast body',
      });

      return {
        toast,
      };
    },
    template: `
      <Toast :toast="toast"/>`,
  });

export const Danger = () =>
  defineComponent({
    components: { Toast },
    setup() {
      const toast = ref<ToastParams>({
        variant: 'danger',
        title: 'Toast title',
        body: 'Toast body',
      });

      return {
        toast,
      };
    },
    template: `
      <Toast :toast="toast"/>`,
  });
