<template>
  <div class="seo-field-group">
    <FormFieldRecommendedLengthInput
      :value="title"
      :label="titleLabel"
      :error="titleErrorMessage"
      :min="50"
      :max="60"
      name="pageTitle"
      @input="handleTitleChange"
    />

    <FormFieldRecommendedLengthInput
      :value="description"
      :label="descriptionLabel"
      :error="descriptionErrorMessage"
      :min="115"
      :max="165"
      type="textarea"
      name="pageDescription"
      @input="handleDescriptionChange"
    />

    <FormFieldFileInput
      :value="image"
      :label="imageLabel"
      :error="imageErrorMessage"
      file-type="image"
      name="openGraphImage"
      @change="handleImageChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api';
import { SeoChangeEvent, SingleFileInputValueType } from '../../typings/common';

import FormFieldRecommendedLengthInput from '../FormFieldRecommendedLengthInput';
import FormFieldFileInput from '../FormFieldFileInput/index.vue';

interface Props {
  titleLabel: string;
  title: string;
  titleErrorMessage: string;
  descriptionLabel: string;
  description: string;
  descriptionErrorMessage: string;
  imageLabel: string;
  image: SingleFileInputValueType | null;
  imageErrorMessage: string;
}

export default defineComponent<Props>({
  name: 'SeoFieldGroup',
  components: { FormFieldRecommendedLengthInput, FormFieldFileInput },
  props: {
    titleLabel: {
      type: String,
      default: 'Page title',
    },
    title: {
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
    description: {
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
    image: {
      type: Object as PropType<SingleFileInputValueType>,
      default: null,
    },
    imageErrorMessage: {
      type: String,
      default: '',
    },
  },
  setup(props: Props, context: SetupContext) {
    function handleTitleChange(value: string) {
      context.emit('change:title', value);
      emitChangeEvent({ title: value });
    }

    function handleDescriptionChange(value: string) {
      context.emit('change:description', value);
      emitChangeEvent({ description: value });
    }

    function handleImageChange(value: SingleFileInputValueType | null) {
      context.emit('change:image', value);
      emitChangeEvent({ image: value });
    }

    function emitChangeEvent(event: Partial<SeoChangeEvent>) {
      const value: SeoChangeEvent = {
        title: props.title,
        description: props.description,
        image: props.image,
        ...event,
      };

      context.emit('change', value);
    }

    return {
      handleTitleChange,
      handleDescriptionChange,
      handleImageChange,
    };
  },
});
</script>

<style scoped lang="scss"></style>
