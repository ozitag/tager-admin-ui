<template>
  <footer class="footer">
    <div class="bottom">
      <BaseButton class="btn-back" variant="secondary" :href="backHref">
        {{ backLabel }}
      </BaseButton>

      <div class="bottom-right">
        <FormFieldCheckbox
          v-if="isCheckboxVisible"
          v-model="isAnotherCreationEnabled"
          class="checkbox"
          name="reset"
          :label="addAnotherLabel || t('ui:formFooter.addMore')"
          :disabled="isSubmitting"
        />

        <BaseButton
          class="btn-save"
          variant="primary"
          :loading="isSubmitting"
          :disabled="isSubmitButtonDisabled"
          @click="handleSaveClick"
        >
          {{ computedSubmitLabel }}
        </BaseButton>

        <BaseButton
          v-if="shouldDisplaySaveAndExitButton"
          class="btn-save-and-exit"
          variant="primary"
          :loading="isSubmitting && !isSaveAndExitButtonDisabled"
          :disabled="isSaveAndExitButtonDisabled"
          @click="handleSaveAndExitClick"
        >
          {{ computedSubmitAndExitLabel }}
        </BaseButton>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { TagerFormSubmitEvent } from '../../typings/common';
import BaseButton from '../BaseButton/index.vue';
import FormFieldCheckbox from '../FormFieldCheckbox/index.vue';
import useTranslate from '../../hooks/useTranslate';

interface Props {
  backHref: string;
  backLabel: string;
  onSubmit: (event: TagerFormSubmitEvent) => Promise<void>;
  submitLabel: string;
  submitAndExitLabel: string;
  isSubmitting: boolean;
  isSubmitButtonDisabled: boolean;
  isCreation: boolean;
  canCreateAnother: boolean;
}

export default defineComponent<Props>({
  name: 'FormFooter',
  components: {
    BaseButton,
    FormFieldCheckbox,
  },
  props: {
    backHref: {
      type: String,
      default: '/',
    },
    backLabel: {
      type: String,
      default: 'Назад',
    },
    onSubmit: {
      type: Function,
      default: () => {
        console.error('Please, specify "onSubmit" prop for page footer');
      },
    },
    submitLabel: {
      type: String,
      default: '',
    },
    submitAndExitLabel: {
      type: String,
      default: '',
    },
    isSubmitting: Boolean,
    isSubmitButtonDisabled: Boolean,
    addAnotherLabel: {
      type: String,
      default: '',
    },
    isCreation: {
      type: Boolean,
      default: false,
    },
    canCreateAnother: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: Props, context) {
    const { t } = useTranslate(context);
    const isAnotherCreationEnabled = ref<boolean>(false);

    function handleSaveClick() {
      const event: TagerFormSubmitEvent = {
        type:
          props.isCreation && isAnotherCreationEnabled.value
            ? 'create_create-another'
            : props.isCreation
            ? 'create'
            : 'save',
      };

      props.onSubmit(event);
    }

    function handleSaveAndExitClick() {
      const event: TagerFormSubmitEvent = {
        type: props.isCreation ? 'create_exit' : 'save_exit',
      };

      props.onSubmit(event);
    }

    const computedSubmitLabel = computed(() => {
      if (props.submitLabel) return props.submitLabel;

      return t(
        props.isCreation ? 'ui:formFooter.create' : 'ui:formFooter.save'
      );
    });

    const computedSubmitAndExitLabel = computed(() => {
      if (props.submitAndExitLabel) return props.submitAndExitLabel;

      return t(
        props.isCreation
          ? 'ui:formFooter.createAndExit'
          : 'ui:formFooter.saveAndExit'
      );
    });

    const isCheckboxVisible = computed(
      () => props.isCreation && props.canCreateAnother
    );

    const shouldDisplaySaveAndExitButton = computed(() => {
      const isEditing = !props.isCreation;
      return isEditing || (props.isCreation && props.canCreateAnother);
    });

    const isSaveAndExitButtonDisabled = computed(() => {
      if (props.isCreation && isAnotherCreationEnabled.value) return true;

      return props.isSubmitButtonDisabled;
    });

    return {
      isAnotherCreationEnabled,
      handleSaveClick,
      handleSaveAndExitClick,
      computedSubmitLabel,
      computedSubmitAndExitLabel,
      isCheckboxVisible,
      shouldDisplaySaveAndExitButton,
      isSaveAndExitButtonDisabled,
      t,
    };
  },
});
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eee;
  padding: 8px 15px;
  min-height: 55px;
  background: #fff;
  margin: 0 0 0;
  font-size: 14px;

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .bottom-right {
    }
  }
}

.btn-back,
.btn-save,
.btn-save-and-exit {
  min-width: 100px;
}

.btn-save-and-exit {
  margin-left: 1rem;
}

.checkbox {
  display: inline-block;
  margin: 0 1rem 0 0;
}
</style>
