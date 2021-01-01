<template>
  <button
    :is="isLink ? 'a' : 'button'"
    :class="['button', variant, { loading: loading }]"
    :type="isLink ? undefined : type"
    :disabled="isDisabled"
    :href="isLink ? resolvedHref : undefined"
    v-on="buttonListeners"
  >
    <span v-if="loading" class="spinner-wrapper">
      <spinner class="button-spinner" size="28" />
    </span>

    <slot>Submit</slot>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { isAbsoluteUrl } from '@tager/admin-services';
import Spinner from '../Spinner/index.vue';
import { RawLocation } from 'vue-router';

interface Props {
  variant: string;
  type: string;
  disabled: boolean;
  loading: boolean;
  href: string;
}

export default defineComponent<Props>({
  name: 'BaseButton',
  components: { Spinner },
  props: {
    variant: {
      type: String,
      validator(value: string) {
        return [
          'primary',
          'outline-primary',
          'secondary',
          'outline-secondary',
          'icon',
        ].includes(value);
      },
      default: 'primary',
    },
    type: {
      type: String,
      default: 'button',
    },
    disabled: Boolean,
    loading: Boolean,
    href: {
      type: String,
      default: null,
    },
  },
  setup(props, context) {
    const isLink = computed(() => Boolean(props.href));

    const isDisabled = computed(() => props.disabled || props.loading);

    const resolvedHref = computed(() => {
      if (isLink.value && context.root.$router && !isAbsoluteUrl(props.href)) {
        return context.root.$router.resolve(props.href as RawLocation).href;
      }
      return props.href;
    });

    const buttonListeners = computed(() => ({
      ...context.listeners,
      click: (event: Event) => {
        if (isDisabled.value) {
          event.preventDefault();
          return;
        }

        if (props.href && !isAbsoluteUrl(props.href)) {
          event.preventDefault();

          if (context.root.$router) {
            context.root.$router.push(props.href as RawLocation);
          } else {
            console.error(
              `Vue router is [${String(
                context.root.$router
              )}]. Cannot make page transition`
            );
          }
        }

        if (context.listeners.click) {
          if (Array.isArray(context.listeners.click)) {
            context.listeners.click.forEach((callback) => {
              callback(event);
            });
          } else {
            context.listeners.click(event);
          }
        }
      },
    }));

    return {
      isLink,
      isDisabled,
      resolvedHref,
      buttonListeners,
    };
  },
});
</script>

<style scoped lang="scss">
.button {
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

  &:hover {
    text-decoration: none;
  }

  &:disabled {
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

  ::v-deep svg {
    display: block;
    fill: currentColor;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  &:not(:disabled):hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
}
</style>
