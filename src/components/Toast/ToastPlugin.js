import { EventBus } from './Toast.helpers';

const toast = (params) => {
  const id = Date.now() + Math.round(Math.random() * 1000);
  EventBus.$emit('toast-show', { id, ...params });
};

const ToastPlugin = (VueConstructor) => {
  VueConstructor.prototype.$toast = toast;
  VueConstructor.$toast = toast;
};

export default ToastPlugin;
