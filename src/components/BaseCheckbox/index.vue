<template>
  <input type="checkbox" v-on="inputListeners" />
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseCheckbox',
  model: {
    prop: 'checked',
    event: 'change',
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
});
</script>

<style scoped lang="scss">
input {
  position: absolute;
  margin-top: 0.3rem;
  -webkit-appearance: checkbox;
}
</style>
