<template>
  <div class="button-field-container">
    <div class="title-row">
      <span class="field-title">{{ label }}</span>

      <BaseButton
        v-if="value"
        variant="icon"
        :title="t('ui:mapField.remove')"
        @click="handleRemoveValue"
      >
        <SvgIcon name="removeCircle" />
      </BaseButton>
      <BaseButton
        v-else
        variant="icon"
        :title="t('ui:mapField.add')"
        @click="handleAddValue"
      >
        <SvgIcon name="addCircle" />
      </BaseButton>
    </div>

    <template v-if="value">
      <Map
        :value="currentCoords"
        :is-editing="isFormEditing"
        @change="handleChange($event)"
      />
      <CoordinatesForm
        :value="currentCoords"
        :is-editing="isFormEditing"
        @editing:start="isFormEditing = true"
        @editing:finish="handleChange($event)"
      />
    </template>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  SetupContext,
} from '@vue/composition-api';
import type { LatLngLiteral } from 'leaflet';

import SvgIcon from '../SvgIcon';
import BaseButton from '../BaseButton';
import FormField from '../FormField';
import FormFieldCheckbox from '../FormFieldCheckbox';

import { MapFieldValueType, MapFieldValueSchema } from './MapField.helpers';
import CoordinatesForm from './components/CoordinatesForm.vue';
import Map from './components/Map.vue';
import useTranslation from '../../hooks/useTranslation';

type NonNullableMapFieldValueType = NonNullable<MapFieldValueType>;

const INITIAL_VALUE: NonNullableMapFieldValueType = {
  latitude: 53.90523347876076,
  longitude: 27.44307786226273,
} as const;

type Props = {
  value: MapFieldValueType;
  label: string;
};

export default defineComponent<Props>({
  name: 'MapField',
  components: {
    FormField,
    FormFieldCheckbox,
    BaseButton,
    SvgIcon,
    CoordinatesForm,
    Map,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: Object,
      default: null,
      validator(value: unknown): boolean {
        return MapFieldValueSchema.check(value);
      },
    },
    label: {
      type: String,
      default: '',
    },
  },
  setup(props: Props, context: SetupContext) {
    const { t } = useTranslation(context);

    const isFormEditing = ref<boolean>(false);

    const currentCoords = computed<LatLngLiteral>(() => ({
      lat: props.value?.latitude ?? INITIAL_VALUE.latitude,
      lng: props.value?.longitude ?? INITIAL_VALUE.longitude,
    }));

    function handleChange(newCoordinates: LatLngLiteral) {
      const newValue: NonNullableMapFieldValueType = {
        latitude: newCoordinates.lat,
        longitude: newCoordinates.lng,
      };

      context.emit('change', newValue);
      isFormEditing.value = false;
    }

    function handleRemoveValue() {
      context.emit('change', null);
    }

    function handleAddValue() {
      context.emit('change', { ...INITIAL_VALUE });
    }

    return {
      t,
      handleRemoveValue,
      handleAddValue,
      handleChange,
      currentCoords,
      isFormEditing,
    };
  },
});
</script>

<style scoped lang="scss">
.button-field-container {
  margin-bottom: 1rem;
}

.title-row {
  display: inline-flex;
  align-items: center;
}

.field-title {
  font-size: 1.2rem;
}
</style>
