<template>
  <FormGroup>
    <InputLabel :for="id">{{ label }}</InputLabel>
    <div class="field-inner">
      <span ref="measureTextRef" class="measure">{{ value }}</span>
      <small>{{ urlParts[0] }}</small>
      <BaseInput
        :id="id"
        :style="inputStyle"
        :value="value"
        v-bind="$attrs"
        class="alias-input"
      />
      <small>{{ urlParts[1] }}</small>
    </div>
    <FormFieldError v-if="Boolean(error)">
      {{ error }}
    </FormFieldError>
  </FormGroup>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  Ref,
  ref,
} from "vue";

import { Nullable } from "@tager/admin-services";

import FormGroup from "../FormGroup.vue";
import FormFieldError from "../FormFieldError";
import InputLabel from "../InputLabel";
import BaseInput from "../BaseInput";

interface Props {
  label: string;
  value: string;
  id?: Nullable<string>;
  urlTemplate: string;
  error?: Nullable<string>;
}

export default defineComponent({
  name: "FormFieldUrlAliasInput",
  components: {
    FormGroup,
    FormFieldError,
    InputLabel,
    BaseInput,
  },
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    urlTemplate: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const inputStyle = ref<{ width: string }>({ width: "0px" });
    const measureTextRef: Ref<Nullable<HTMLSpanElement>> = ref(null);

    function updateInputWidth() {
      if (!measureTextRef.value) return;

      const newWidth = measureTextRef.value.offsetWidth;
      inputStyle.value = { width: newWidth + 2 + "px" };
    }

    const mutationObserver = new MutationObserver(() => {
      updateInputWidth();
    });

    const intersectionObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.intersectionRatio === 1) {
        updateInputWidth();
      }
    });

    onMounted(() => {
      if (!measureTextRef.value) return;
      mutationObserver.observe(measureTextRef.value, {
        subtree: true,
        characterData: true,
      });

      intersectionObserver.observe(measureTextRef.value);

      updateInputWidth();
    });

    onBeforeUnmount(() => {
      mutationObserver.disconnect();
      intersectionObserver.disconnect();
    });

    const urlParts = computed<Array<string>>(() => {
      const templateVar = "{alias}";
      const index = props.urlTemplate.indexOf(templateVar);

      if (index === -1) return [props.urlTemplate];

      return [
        props.urlTemplate.slice(0, index),
        props.urlTemplate.slice(index + templateVar.length),
      ];
    });

    return { inputStyle, urlParts, measureTextRef };
  },
});
</script>

<style scoped lang="scss">
.field-inner {
  position: relative;
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.measure {
  pointer-events: none;
  position: absolute;
  opacity: 0;
  padding: 0.375rem 0.75rem;
  border: 1px solid var(--input-border-color);
}

.alias-input {
  width: auto;
  min-width: 6rem;
  margin: 0 0.3rem;
}
</style>
