<template>
  <a
    v-if="isLink"
    :class="className"
    :href="resolvedHref"
    data-ui-base-button
    @click="handleClick"
  >
    <slot>Navigate</slot>
  </a>
  <button
    v-else
    :class="className"
    :type="isLink ? undefined : type"
    :disabled="isDisabled"
    data-ui-base-button
    @click="handleClick"
  >
    <span v-if="loading" class="spinner-wrapper">
      <BaseSpinner class="button-spinner" size="28" />
    </span>

    <slot>Submit</slot>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";
import { useRouter } from "vue-router";

import { isAbsoluteUrl } from "@tager/admin-services";

import BaseSpinner from "../BaseSpinner";

export type ButtonVariant =
  | "primary"
  | "outline-primary"
  | "secondary"
  | "outline-secondary"
  | "icon";

interface Props {
  variant: ButtonVariant;
  type: string;
  disabled: boolean;
  loading: boolean;
  href: string;
}

export default defineComponent({
  name: "BaseButton",
  components: { BaseSpinner },
  props: {
    variant: {
      type: String as PropType<ButtonVariant>,
      validator(value: string) {
        return [
          "primary",
          "outline-primary",
          "secondary",
          "outline-secondary",
          "icon",
        ].includes(value);
      },
      default: "primary",
    },
    type: {
      type: String,
      default: "button",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    href: {
      type: String,
      default: "",
    },
  },
  emits: ["click"],
  setup(props: Props, context) {
    const router = useRouter();

    const isLink = computed<boolean>(() => Boolean(props.href));

    const isDisabled = computed<boolean>(() =>
      Boolean(props.disabled || props.loading)
    );

    const resolvedHref = computed<string>(() => {
      if (isLink.value && router && !isAbsoluteUrl(props.href)) {
        return router.resolve(props.href).href;
      }
      return props.href;
    });

    const className = computed(() => [
      "button",
      props.variant,
      { loading: props.loading },
    ]);

    function handleClick(event: Event) {
      if (isDisabled.value) {
        event.preventDefault();
        return;
      }

      if (props.href && !isAbsoluteUrl(props.href)) {
        event.preventDefault();

        if (router) {
          router.push(props.href);
        } else {
          console.error(
            `Vue router is [${String(router)}]. Cannot make page transition`
          );
        }
      }

      context.emit("click", event);
    }

    return {
      isLink,
      isDisabled,
      resolvedHref,
      handleClick,
      className,
    };
  },
});
</script>

<style scoped lang="scss">
.button,
a {
  position: relative;
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }

  &:disabled,
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.3;
  }

  &.loading {
    color: transparent;
    cursor: wait;
  }
}

.spinner-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 0.25rem;

  display: flex;
  align-items: center;
  justify-content: center;

  .button-spinner {
    display: block;
  }
}

.primary {
  color: white;
  border-color: var(--primary);
  background-color: var(--primary);

  .button-spinner {
    color: white;
  }

  &:not(:disabled):hover,
  &:not(:disabled):active {
    background-color: var(--primary-dark);
  }

  &:focus {
    box-shadow: 0 0 0 0.2rem var(--primary-shadow);
  }
}

.secondary {
  color: white;
  border-color: var(--secondary);
  background-color: var(--secondary);

  .button-spinner {
    color: white;
  }

  &:not(:disabled):hover,
  &:not(:disabled):active {
    background-color: var(--secondary-dark);
  }

  &:focus {
    box-shadow: 0 0 0 0.2rem var(--secondary-shadow);
  }
}

.outline-primary {
  color: var(--primary);
  border-color: var(--primary);

  .button-spinner {
    color: var(--primary);
  }

  &:not(:disabled):hover,
  &:not(:disabled):active {
    background-color: var(--primary);
    color: white;

    .button-spinner {
      color: white;
    }
  }

  &:focus {
    box-shadow: 0 0 0 0.2rem var(--primary-shadow);
  }
}

.outline-secondary {
  color: var(--secondary);
  border-color: var(--secondary);

  .button-spinner {
    color: var(--secondary);
  }

  &:not(:disabled):hover,
  &:not(:disabled):active {
    background-color: var(--secondary);
    color: white;

    .button-spinner {
      color: white;
    }
  }

  &:focus {
    box-shadow: 0 0 0 0.2rem var(--secondary-shadow);
  }
}

.icon {
  padding: 0.375rem;
  border-radius: 50%;
  color: var(--secondary);

  :deep(svg) {
    display: block;
    fill: currentColor;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  &:not(:disabled):hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
}
</style>
