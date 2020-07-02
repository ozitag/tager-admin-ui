<template>
  <div class="container">
    <div class="top">
      <slot name="top"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue';

export default Vue.extend({
  name: 'MainLayout'
});
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  padding: 0;
  background: #fff;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 10px 15px;
  min-height: 60px;
}

.content {
  background-color: white;
  padding: 15px;
}
</style>
