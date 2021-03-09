import { EventBus } from './Toast.helpers';
import { VueConstructor } from 'vue';
import { ToastParams } from '../../typings/common';

const toast = (params: ToastParams): void => {
  const id = Date.now() + Math.round(Math.random() * 1000);
  EventBus.$emit('toast-show', { id, ...params });
};

const ToastPlugin = (vueConstructor: VueConstructor): void => {
  vueConstructor.prototype.$toast = toast;
  vueConstructor.$toast = toast;
};

export default ToastPlugin;
