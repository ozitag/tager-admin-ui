<template>
  <footer class="footer">
    <div class="bottom">
      <BaseButton class="btn-back" variant="secondary" :href="backHref">
        {{ backLabel }}
      </BaseButton>

      <div class="bottom-right">
        <FormFieldCheckbox
          v-if="isCreation && shouldCreateAnother"
          v-model="isCheckedAddMore"
          class="checkbox"
          name="reset"
          :label="resetLabel"
        />

        <BaseButton
          class="btn-save"
          variant="primary"
          :loading="isSubmitting"
          :disabled="isSubmitButtonDisabled"
          @click="handleSaveClick"
        >
          {{ submitLabel || isCreation ? 'Создать' : 'Сохранить' }}
        </BaseButton>

        <BaseButton
          class="btn-save-and-exit"
          variant="primary"
          :loading="
            isSubmitting &&
            !(isCreation && shouldCreateAnother && isCheckedAddMore)
          "
          :disabled="
            isSubmitButtonDisabled ||
            (isCreation && shouldCreateAnother && isCheckedAddMore)
          "
          @click="handleSaveAndExitClick"
        >
          {{
            submitAndExitLabel || isCreation
              ? 'Создать и выйти'
              : 'Сохранить и выйти'
          }}
        </BaseButton>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import BaseButton from '../BaseButton/index.vue';
import FormFieldCheckbox from '../FormFieldCheckbox/index.vue';

interface Props {
  backHref: string;
  backLabel: string;
  onSubmit: (config: {
    shouldExit?: boolean;
    shouldReset?: boolean;
  }) => Promise<void>;
  submitLabel: string;
  submitAndExitLabel: string;
  isSubmitting: boolean;
  isSubmitButtonDisabled: boolean;
  isCreation: boolean;
  shouldCreateAnother: boolean;
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
    resetLabel: {
      type: String,
      default: 'Добавить еще',
    },
    isCreation: {
      type: Boolean,
      default: false,
    },
    shouldCreateAnother: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: Props) {
    const isCheckedAddMore = ref<boolean>(false);

    function handleSaveClick() {
      props.onSubmit({
        shouldExit: false,
        shouldReset: isCheckedAddMore.value,
      });
    }

    function handleSaveAndExitClick() {
      props.onSubmit({ shouldExit: true, shouldReset: false });
    }

    return {
      isCheckedAddMore,
      handleSaveClick,
      handleSaveAndExitClick,
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
