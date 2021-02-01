<template>
  <div class="search-engine-optimization">
    <FormField
      v-model="title"
      :label="titleLabel"
      :error="titleErrorMessage"
      name="pageTitle"
    />

    <FormField
      v-model="description"
      :label="descriptionLabel"
      :error="descriptionErrorMessage"
      type="textarea"
      name="pageDescription"
    />

    <FormFieldFileInput
      v-model="image"
      :label="imageLabel"
      :error="imageErrorMessage"
      file-type="image"
      name="openGraphImage"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  SetupContext,
  watch,
} from '@vue/composition-api';
import {
  EventSearchEngineOptimization,
  SingleFileInputValueType,
} from '../../typings/common';

import FormField from '../FormField/index.vue';
import FormFieldFileInput from '../FormFieldFileInput/index.vue';

interface Props {
  titleLabel: string;
  titleValue: string;
  titleErrorMessage: string;
  descriptionLabel: string;
  descriptionValue: string;
  descriptionErrorMessage: string;
  imageLabel: string;
  imageValue: SingleFileInputValueType | null;
  imageErrorMessage: string;
}

export default defineComponent<Props>({
  name: 'SearchEngineOptimization',
  components: { FormField, FormFieldFileInput },
  props: {
    titleLabel: {
      type: String,
      default: 'Page title',
    },
    titleValue: {
      type: String,
      default: '',
    },
    titleErrorMessage: {
      type: String,
      default: '',
    },
    descriptionLabel: {
      type: String,
      default: 'Page description',
    },
    descriptionValue: {
      type: String,
      default: '',
    },
    descriptionErrorMessage: {
      type: String,
      default: '',
    },
    imageLabel: {
      type: String,
      default: 'Open graph image',
    },
    imageValue: {
      type: Object as PropType<SingleFileInputValueType>,
      default: null,
    },
    imageErrorMessage: {
      type: String,
      default: '',
    },
  },
  setup(props: Props, context: SetupContext) {
    const title = ref<string>(props.titleValue);

    watch(title, (value) => {
      context.emit('change:title', value);
    });

    const description = ref<string>(props.descriptionValue);

    watch(description, (value) => {
      context.emit('change:description', value);
    });

    const image = ref<SingleFileInputValueType | null>(props.imageValue);

    watch(image, (value) => {
      context.emit('change:image', value);
    });

    watch([title, description, image], () => {
      const value: EventSearchEngineOptimization = {
        title: title.value,
        description: description.value,
        image: image.value,
      };

      context.emit('change', value);
    });

    return {
      title,
      description,
      image,
    };
  },
});
</script>

<style scoped lang="scss"></style>
