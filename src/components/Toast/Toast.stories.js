import Toast from './Toast.vue';

export default { title: 'Toast' };

export const Primary = () => ({
  components: { Toast },
  data() {
    return {
      toast: {
        variant: 'primary',
        title: 'Toast title',
        body: 'Toast body',
      },
    };
  },
  template: `
      <toast :toast="toast"/>`,
});

export const Secondary = () => ({
  components: { Toast },
  data() {
    return {
      toast: {
        variant: 'secondary',
        title: 'Toast title',
        body: 'Toast body',
      },
    };
  },
  template: `
      <toast :toast="toast"/>`,
});

export const Success = () => ({
  components: { Toast },
  data() {
    return {
      toast: {
        variant: 'success',
        title: 'Toast title',
        body: 'Toast body',
      },
    };
  },
  template: `
      <toast :toast="toast"/>`,
});

export const Info = () => ({
  components: { Toast },
  data() {
    return {
      toast: {
        variant: 'info',
        title: 'Toast title',
        body: 'Toast body',
      },
    };
  },
  template: `
      <toast :toast="toast"/>`,
});

export const Warning = () => ({
  components: { Toast },
  data() {
    return {
      toast: {
        variant: 'warning',
        title: 'Toast title',
        body: 'Toast body',
      },
    };
  },
  template: `
      <toast :toast="toast"/>`,
});

export const Danger = () => ({
  components: { Toast },
  data() {
    return {
      toast: {
        variant: 'danger',
        title: 'Toast title',
        body: 'Toast body',
      },
    };
  },
  template: `
      <toast :toast="toast"/>`,
});
