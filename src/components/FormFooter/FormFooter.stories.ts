import FormFooter from './FormFooter.vue';
import { defineComponent, ref } from '@vue/composition-api';

export default { title: 'FormFooter' };

const PageFooterStorybook = defineComponent({
  name: 'FormFooterStorybook',
  components: { FormFooter },
  props: {
    isCreation: {
      type: Boolean,
      default: false,
    },
    shouldCreateAnother: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const isSubmitting = ref<boolean>(false);

    function submitForm({
      shouldExit,
      shouldReset,
    }: {
      shouldExit: boolean;
      shouldReset: boolean;
    }) {
      console.log('shouldExit', shouldExit);
      console.log('shouldReset', shouldReset);

      isSubmitting.value = true;

      new Promise((resolve) => {
        setTimeout(() => resolve({}), 1000);
      })
        .then(() => {
          if (shouldExit) {
            // context.root.$router.push(something);
            alert('context.root.$router.push(something)');
            console.log('context.root.$router.push(something)');
          }

          if (shouldReset) {
            // values.value = reset value
            alert('values.value = reset value');
            console.log('values.value = reset value');
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          isSubmitting.value = false;
        });
    }

    return {
      submitForm,
      isSubmitting,
    };
  },
  template: `
      <div style="border: 3px solid #f1f1f1; border-top-left-radius: 4px; border-top-right-radius: 4px;">
        <div style="padding: 10px; background: #f1f1f1; border-top-left-radius: 4px; border-top-right-radius: 4px;">
          <div style="width: 12px; height: 12px; background-color: #bbb; border-radius: 50%; display: inline-block;"></div>
          <div style="width: 12px; height: 12px; background-color: #bbb; border-radius: 50%; display: inline-block;"></div>
          <div style="width: 12px; height: 12px; background-color: #bbb; border-radius: 50%; display: inline-block;"></div>
        </div>
        <div style="padding: 10px; height: 500px">
          <h3>Browser Window</h3>
          <p>How to create a browser window look with CSS.</p>
        </div>
        <FormFooter
          :on-submit="submitForm"
          :is-submitting="isSubmitting"
          :is-creation="isCreation"
          :should-create-another="shouldCreateAnother"
        />
      </div>
    `,
});

export const Create = () =>
  defineComponent({
    name: 'FormFooterCreate',
    components: { PageFooterStorybook },
    template: `<PageFooterStorybook :is-creation="true" />`,
  });

export const CreateAnother = () =>
  defineComponent({
    name: 'FormFooterCreateAnother',
    components: { PageFooterStorybook },
    template: `<PageFooterStorybook :is-creation="true" :should-create-another="true" />`,
  });

export const Edit = () =>
  defineComponent({
    name: 'FormFooterEdit',
    components: { PageFooterStorybook },
    template: `<PageFooterStorybook :is-creation="false" />`,
  });
