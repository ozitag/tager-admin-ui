<template>
  <div>
    <div class="row">
      <FormFieldNumberInput
        :value="values.lat"
        :label="t('ui:mapField.latitude')"
        name="lat"
        :error="errors.lat"
        :disabled="!isEditing"
        @input="handleChange('lat', $event)"
      />
      <FormFieldNumberInput
        :value="values.lng"
        :label="t('ui:mapField.longitude')"
        name="lng"
        :error="errors.lng"
        :disabled="!isEditing"
        @input="handleChange('lng', $event)"
      />
      <div>
        <BaseButton
          v-if="isEditing"
          :disabled="isInvalid"
          variant="primary"
          @click="handleSubmit"
        >
          {{ t('ui:mapField.submit') }}
        </BaseButton>
        <BaseButton v-else variant="icon" @click="handleStartEditing">
          <SvgIcon name="edit" />
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  SetupContext,
  watch,
} from '@vue/composition-api';
import { isNotNullish, isString } from '@tager/admin-services';

import FormFieldNumberInput from '../../FormFieldNumberInput';
import SvgIcon from '../../SvgIcon';
import BaseButton from '../../BaseButton';
import { ValuePropSchema, ValueType } from '../MapField.helpers';
import useTranslation from '../../../hooks/useTranslation';

const validators = {
  required(value: unknown): boolean {
    if (isString(value)) return value.trim().length === 0;

    return !value;
  },
  number(value: unknown): boolean {
    return Number.isNaN(Number(value));
  },
};

type FormValues = {
  lat: string;
  lng: string;
};

type FormErrors = {
  lat?: string;
  lng?: string;
};

function convertValuePropToFormValues(valueProp: ValueType): FormValues {
  return {
    lat: String(valueProp.lat),
    lng: String(valueProp.lng),
  };
}

type Props = {
  value: ValueType;
  isEditing: boolean;
};

export default defineComponent<Props>({
  name: 'CoordinatesForm',
  components: {
    FormFieldNumberInput,
    BaseButton,
    SvgIcon,
  },
  props: {
    value: {
      type: Object,
      required: true,
      validator(value: unknown): boolean {
        return ValuePropSchema.check(value);
      },
    },
    isEditing: Boolean,
  },
  setup(props: Props, context: SetupContext) {
    const { t } = useTranslation(context);

    const values = ref<FormValues>(convertValuePropToFormValues(props.value));

    watch(
      () => props.value,
      () => {
        values.value = convertValuePropToFormValues(props.value);
      }
    );

    const errors = ref<FormErrors>({});

    const isInvalid = computed<boolean>(
      () => Object.values(errors.value).filter(isNotNullish).length > 0
    );

    watch(values, () => {
      const newErrors: FormErrors = {};

      function validateField(key: 'lat' | 'lng'): void {
        if (validators.required(values.value[key])) {
          newErrors[key] = t('ui:mapField.required');
        } else if (validators.number(values.value[key])) {
          newErrors[key] = t('ui:mapField.invalidNumber');
        }
      }

      validateField('lat');
      validateField('lng');

      errors.value = newErrors;
    });

    function handleChange(fieldKey: 'lat' | 'lng', fieldValue: string) {
      values.value = {
        ...values.value,
        [fieldKey]: fieldValue,
      };
    }

    function handleSubmit() {
      context.emit('editing:finish', {
        lat: Number(values.value.lat),
        lng: Number(values.value.lng),
      });
    }

    function handleStartEditing() {
      context.emit('editing:start');
    }

    return {
      t,
      values,
      handleSubmit,
      handleChange,
      handleStartEditing,
      isInvalid,
      errors,
    };
  },
});
</script>

<style scoped lang="scss">
.row {
  display: flex;
  margin: 0 -0.5rem;
  align-items: center;

  > div {
    flex: 0 0 33.33%;
    padding: 0 0.5rem;
  }
}
.coordinates {
}

.title-row {
  display: inline-flex;
  align-items: center;
}

.name-col {
  padding-right: 2rem;
}
</style>
