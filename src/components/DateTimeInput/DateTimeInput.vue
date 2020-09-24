<template>
  <div class="button-field-container">
    <div class="title-row">
      <span class="field-title">{{ label }}</span>

      <BaseButton
        v-if="value"
        variant="icon"
        title="Clear"
        @click="handleClearValue"
      >
        <SvgIcon name="removeCircle" />
      </BaseButton>
    </div>

    <div class="fields">
      <FormField
        :value="date"
        type="date"
        label="Date"
        :name="addPrefix('date')"
        @input="handleChange('date', $event)"
      />
      <FormField
        :value="time"
        type="time"
        label="Time"
        :name="addPrefix('time')"
        @input="handleChange('time', $event)"
      />

      <span>
        Result: <em>{{ formattedResult }}</em>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import kebabCase from 'lodash.kebabcase';
import { isNotFalsy } from '@tager/admin-services';

import SvgIcon from '../SvgIcon';
import FormField from '../FormField/index.vue';
import BaseButton from '../BaseButton/index.vue';

type InnerDateTimeValue = {
  date: string;
  time: string;
};

type Props = {
  value: string;
  label: string;
};

export default defineComponent<Props>({
  name: 'DateTimeInput',
  components: { FormField, BaseButton, SvgIcon },
  model: { prop: 'value', event: 'change' },
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    function addLeadingZero(number: number): string {
      return number < 10 ? '0' + number : String(number);
    }

    function formatDateTime(inputValue: InnerDateTimeValue): string {
      const now = new Date();
      const fallbackDate = [
        now.getFullYear(),
        addLeadingZero(now.getMonth() + 1),
        addLeadingZero(now.getDate()),
      ].join('-');

      const fallbackTime = [
        addLeadingZero(now.getHours()),
        addLeadingZero(now.getMinutes()),
      ].join(':');

      return [
        inputValue.date || fallbackDate,
        inputValue.time || fallbackTime,
      ].join('T');
    }

    const parsedDateTime = computed<InnerDateTimeValue>(() => {
      const dateObject = new Date(props.value);

      const isValid = !Number.isNaN(dateObject.valueOf());

      const [date, time] = props.value.split('T');
      return { date: isValid ? date : '', time: isValid ? time : '' };
    });

    const date = computed<string>(() => parsedDateTime.value.date);
    const time = computed<string>(() => parsedDateTime.value.time);

    function addPrefix(field: string): string {
      const prefix = kebabCase(props.label);
      return [prefix, field].join('_');
    }

    function handleChange<FieldName extends keyof InnerDateTimeValue>(
      fieldName: FieldName,
      fieldValue: InnerDateTimeValue[FieldName]
    ) {
      const updatedDateTime: InnerDateTimeValue = {
        ...parsedDateTime.value,
        [fieldName]: fieldValue,
      };

      const formattedValue = formatDateTime(updatedDateTime);
      context.emit('change', formattedValue);
    }

    function handleClearValue() {
      context.emit('change', '');
    }

    const formattedResult = computed<string>(() =>
      props.value.split('T').filter(isNotFalsy).join(', ')
    );

    return {
      date,
      time,
      formattedResult,
      handleChange,
      handleClearValue,
      addPrefix,
    };
  },
});
</script>

<style scoped>
.button-field-container {
  margin-bottom: 1rem;
}

.title-row {
  display: inline-flex;
  align-items: center;
  height: 38px;
}

.field-title {
  font-size: 1.2rem;
}

.fields {
  padding-left: 1rem;
  border-left: 1px solid var(--text-color);
}
</style>
