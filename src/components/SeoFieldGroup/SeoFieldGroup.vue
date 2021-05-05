<template>
  <div class="seo-field-group">
    <FormFieldRecommendedLengthInput
      :value="title"
      :label="computedTitleLabel"
      :error="titleErrorMessage"
      :min="50"
      :max="60"
      :name="titleName"
      @input="handleTitleChange"
    />

    <FormFieldRecommendedLengthInput
      :value="description"
      :label="computedDescriptionLabel"
      :error="descriptionErrorMessage"
      :min="115"
      :max="165"
      type="textarea"
      :name="descriptionName"
      @input="handleDescriptionChange"
    />

    <FormField
      v-if="shouldDisplayKeywords"
      :value="keywords"
      :label="computedKeywordsLabel"
      :error="keywordsErrorMessage"
      :name="keywordsName"
      @input="handleKeywordsChange"
    />

    <FormFieldFileInput
      v-if="shouldDisplayImage"
      :value="image"
      :label="computedImageLabel"
      :error="imageErrorMessage"
      file-type="image"
      :name="imageName"
      :scenario="imageScenario"
      @change="handleImageChange"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext } from '@vue/composition-api';
import { SeoChangeEvent, SingleFileInputValueType } from '../../typings/common';

import FormField from '../FormField';
import FormFieldRecommendedLengthInput from '../FormFieldRecommendedLengthInput';
import FormFieldFileInput from '../FormFieldFileInput';
import useTranslation from '../../hooks/useTranslation';

interface Props {
  titleLabel: string;
  title: string;
  titleName: string;
  titleErrorMessage: string;

  descriptionLabel: string;
  description: string;
  descriptionName: string;
  descriptionErrorMessage: string;

  shouldDisplayKeywords: boolean;
  keywordsLabel: string;
  keywords: string;
  keywordsName: string;
  keywordsErrorMessage: string;

  shouldDisplayImage: boolean;
  imageLabel: string;
  image: SingleFileInputValueType | null;
  imageName: string;
  imageScenario: string | null;
  imageErrorMessage: string;
}

export default defineComponent<Props>({
  name: 'SeoFieldGroup',
  components: {
    FormFieldRecommendedLengthInput,
    FormFieldFileInput,
    FormField,
  },
  props: {
    titleLabel: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    titleName: {
      type: String,
      default: 'pageTitle',
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
    descriptionName: {
      type: String,
      default: 'pageDescription',
    },
    descriptionErrorMessage: {
      type: String,
      default: '',
    },

    shouldDisplayKeywords: {
      type: Boolean,
      default: false,
    },
    keywordsLabel: {
      type: String,
      default: '',
    },
    keywords: {
      type: String,
      default: '',
    },
    keywordsName: {
      type: String,
      default: 'keywords',
    },
    keywordsErrorMessage: {
      type: String,
      default: '',
    },

    shouldDisplayImage: {
      type: Boolean,
      default: true,
    },
    imageLabel: {
      type: String,
      default: '',
    },
    image: {
      type: Object,
      default: null,
    },
    imageName: {
      type: String,
      default: 'openGraphImage',
    },
    imageScenario: {
      type: String,
      default: null,
    },
    imageErrorMessage: {
      type: String,
      default: '',
    },
  },
  setup(props: Props, context: SetupContext) {
    const { t } = useTranslation(context);

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

    const computedKeywordsLabel = computed(() => {
      if (props.keywordsLabel) {
        return props.keywordsLabel;
      }
      return t('ui:seoFieldGroup.keywords');
    });

    const computedImageLabel = computed(() => {
      if (props.imageLabel) {
        return props.imageLabel;
      }
      return t('ui:seoFieldGroup.openGraphImage');
    });

    function emitChangeEvent(event: Partial<SeoChangeEvent>) {
      const value: SeoChangeEvent = {
        title: props.title,
        description: props.description,
        keywords: props.keywords,
        image: props.image,
        ...event,
      };
      context.emit('change', value);
    }

    function handleTitleChange(value: string) {
      context.emit('change:title', value);
      emitChangeEvent({ title: value });
    }

    function handleDescriptionChange(value: string) {
      context.emit('change:description', value);
      emitChangeEvent({ description: value });
    }

    function handleKeywordsChange(value: string) {
      context.emit('change:keywords', value);
      emitChangeEvent({ keywords: value });
    }

    function handleImageChange(value: SingleFileInputValueType | null) {
      context.emit('change:image', value);
      emitChangeEvent({ image: value });
    }

    return {
      computedTitleLabel,
      computedDescriptionLabel,
      computedKeywordsLabel,
      computedImageLabel,
      handleTitleChange,
      handleDescriptionChange,
      handleKeywordsChange,
      handleImageChange,
    };
  },
});
</script>

<style scoped lang="scss"></style>
