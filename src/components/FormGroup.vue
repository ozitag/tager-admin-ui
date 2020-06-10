<template>
  <div class="form-group"><slot></slot></div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'FormGroup',
});
</script>

<style scoped>
.form-group {
  position: relative;
  display: block;
  margin-bottom: 1rem;
}
</style>
