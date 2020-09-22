<template>
  <chrome-color-picker :value="value" @input="handleChange" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { Chrome } from 'vue-color';

type ColorObject = {
  a: number;
  hex: string;
  hex8: string;
  hsl: {
    a: number;
    h: number;
    s: number;
    l: number;
  };
  hsv: {
    a: number;
    h: number;
    s: number;
    v: number;
  };
  oldHue: number;
  rgba: { a: number; r: number; g: number; b: number };
  source: 'rgba' | 'hsva' | 'hsl' | 'hex';
};

export default defineComponent({
  name: 'ColorInput',
  components: { 'chrome-color-picker': Chrome },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: String,
  },
  setup(props, context) {
    function handleChange(newColor: ColorObject): void {
      const { hex, rgba } = newColor;

      const rgbaColor = `rgba(${[rgba.r, rgba.g, rgba.b, rgba.a].join(',')})`;
      const colorString = newColor.a === 1 ? hex : rgbaColor;

      console.log('Change event: ', colorString);

      context.emit('change', colorString);
    }

    return { handleChange };
  },
});
</script>

<style scoped></style>
