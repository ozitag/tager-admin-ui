<template>
  <input ref="checkbox" type="checkbox" v-on="inputListeners" />
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseCheckbox',
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: Boolean,
  },
  computed: {
    inputListeners() {
      const vm = this;

      return {
        ...vm.$listeners,
        change: (event) => vm.$emit('change', event.target.checked),
      };
    },
  },
  mounted() {
    this.updateCheckedInDOM();
  },
  updated() {
    this.updateCheckedInDOM();
  },
  methods: {
    updateCheckedInDOM() {
      /** Issue: https://github.com/vuejs/vue/issues/3523 */
      if (this.$refs.checkbox) {
        this.$refs.checkbox.checked = Boolean(this.checked);
      }
    },
  },
});
</script>

<style scoped lang="scss">
input {
  position: absolute;
  margin-top: 0.3rem;
  -webkit-appearance: checkbox;
}
</style>
