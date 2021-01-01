<template>
  <BaseButton v-bind="$attrs">
    <slot>Submit</slot>
    <span class="count">{{ count }}</span>
  </BaseButton>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import BaseButton from '../BaseButton';

type Props = {
  count: number | string;
};

export default defineComponent<Props>({
  name: 'CountButton',
  components: { BaseButton },
  props: {
    count: [Number, String],
  },
});
</script>

<style lang="scss" scoped>
.count {
  position: relative;
  display: inline-block;
  padding-left: 0.75rem;
  margin: -0.375rem 0 -0.375rem 0.75rem;
  border-left: 1px solid currentColor;
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
</style>
