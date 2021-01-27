<template>
  <ComboBox :searchable="searchable" v-bind="$attrs" v-on="$listeners" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ComboBox from '../ComboBox';

interface Props {
  searchable: boolean;
}

export default defineComponent<Props>({
  name: 'BaseSelect',
  components: { ComboBox },
  inheritAttrs: false,
  props: {
    searchable: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped lang="scss"></style>
