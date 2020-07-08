<template>
  <ul>
    <li v-for="(option, index) of options" :key="index">
      <dropdown-item :item="option" @click="handleItemClick(option)" />
    </li>
  </ul>
</template>

<script lang="js">
import Vue from 'vue';
import DropdownItem from './components/DropdownItem';

export default Vue.extend({
  name: 'DropdownMenu',
  components: { DropdownItem },
  props: {
    options: {
      type: Array,
      default: () => []
    },
  },
  methods: {
    handleItemClick(option) {
      if (option.type === 'divider') return;

      this.$emit('dropdown-item:click');
    }
  },
});
</script>

<style scoped lang="scss">
ul {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
}
</style>
