<template>
  <div class="spinner-container"><slot></slot></div>
</template>

<script lang="js">
import Vue from 'vue';

export default Vue.extend({
  name: 'SpinnerContainer',
});
</script>

<style scoped lang="scss">
.spinner-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  svg {
    display: block;
  }
}
</style>
