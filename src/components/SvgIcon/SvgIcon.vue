<template>
  <component :is="iconComponent"></component>
</template>

<script lang="ts">
import { VueConstructor } from 'vue';
import { defineComponent } from '@vue/composition-api';

import { ICON_MAP } from './SvgIcon.constants';

type IconName = keyof typeof ICON_MAP;

type Props = Readonly<{
  name: IconName;
}>;

export default defineComponent<Props>({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      validator(value: string) {
        return Object.keys(ICON_MAP).includes(value);
      },
      required: true,
    },
  },
  computed: {
    iconComponent(): VueConstructor {
      return ICON_MAP[this.name];
    },
  },
});
</script>

<style scoped></style>
