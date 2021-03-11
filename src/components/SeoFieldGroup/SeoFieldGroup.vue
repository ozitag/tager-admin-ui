<template>
  <div class="seo-field-group">
    <FormFieldRecommendedLengthInput
      :value="title"
      :label="computedTitleLabel"
      :error="titleErrorMessage"
      :min="50"
      :max="60"
      name="pageTitle"
      @input="handleTitleChange"
    />

    <FormFieldRecommendedLengthInput
      :value="description"
      :label="computedDescriptionLabel"
      :error="descriptionErrorMessage"
      :min="115"
      :max="165"
      type="textarea"
      name="pageDescription"
      @input="handleDescriptionChange"
    />

    <FormFieldFileInput
      :value="image"
      :label="computedImageLabel"
      :error="imageErrorMessage"
      file-type="image"
      name="openGraphImage"
      @change="handleImageChange"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext } from '@vue/composition-api';
import { SeoChangeEvent, SingleFileInputValueType } from '../../typings/common';

import FormFieldRecommendedLengthInput from '../FormFieldRecommendedLengthInput';
import FormFieldFileInput from '../FormFieldFileInput';
import useTranslation from '../../hooks/useTranslation';

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
      default: '',
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
      default: '',
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
      default: '',
    },
    image: {
      type: Object,
      default: null,
    },
    imageErrorMessage: {
      type: String,
      default: '',
    },
  },
  setup(props: Props, context: SetupContext) {
    const { t } = useTranslation(context);

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

    const computedTitleLabel = computed(() => {
      if (props.titleLabel) {
        return props.titleLabel;
      }
      return t('ui:seoFieldGroup.pageTitle');
    });

    const computedDescriptionLabel = computed(() => {
      if (props.descriptionLabel) {
        return props.descriptionLabel;
      }
      return t('ui:seoFieldGroup.pageDescription');
    });

    const computedImageLabel = computed(() => {
      if (props.imageLabel) {
        return props.imageLabel;
      }
      return t('ui:seoFieldGroup.openGraphImage');
    });

    return {
      computedTitleLabel,
      computedDescriptionLabel,
      computedImageLabel,
      handleTitleChange,
      handleDescriptionChange,
      handleImageChange,
    };
  },
});
</script>

<style scoped lang="scss"></style>
