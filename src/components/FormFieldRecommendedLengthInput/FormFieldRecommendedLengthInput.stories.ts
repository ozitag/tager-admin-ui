import FormFieldRecommendedLengthInput from './FormFieldRecommendedLengthInput.vue';

export default { title: 'FormFieldRecommendedLengthInput' };

export const InputMinLength = () => ({
  components: { FormFieldRecommendedLengthInput },
  data() {
    return {
      value: '',
    };
  },
  template:
    '<FormFieldRecommendedLengthInput v-model="value" name="email" label="label" type="text" :lower-limit="50" />',
});

export const InputMaxLength = () => ({
  components: { FormFieldRecommendedLengthInput },
  data() {
    return {
      value: '',
    };
  },
  template:
    '<FormFieldRecommendedLengthInput v-model="value" name="text" label="label" type="text" :upper-limit="100" />',
});

export const InputMinMaxLength = () => ({
  components: { FormFieldRecommendedLengthInput },
  data() {
    return {
      value: '',
    };
  },
  template:
    '<FormFieldRecommendedLengthInput v-model="value" name="name" label="label" type="text" :lower-limit="50" :upper-limit="100" />',
});

export const TextAreaMinMaxLength = () => ({
  components: { FormFieldRecommendedLengthInput },
  data() {
    return {
      value: '',
    };
  },
  template:
    '<FormFieldRecommendedLengthInput v-model="value" name="description" label="label" type="textarea" :lower-limit="65" :upper-limit="434" />',
});
