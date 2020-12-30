<template>
  <label :class="mainClass"><slot></slot></label>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

interface Props {
  forCheckbox: boolean;
}

export default defineComponent<Props>({
  name: 'InputLabel',
  props: {
    forCheckbox: {
      type: Boolean,
    },
  },
  data() {
    return {
      mainClass: this.forCheckbox ? 'checkbox-label' : '',
    };
  },
});
</script>

<style scoped lang="scss">
label {
  display: inline-block;
  margin-bottom: 0.5rem;
}

.checkbox-label {
  margin-bottom: 0;
  user-select: none;
  padding-left: 1.25rem;
}
</style>
