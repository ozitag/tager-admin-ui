import BaseButton from './BaseButton.vue';
import SvgIcon from '../SvgIcon';
import { defineComponent } from '@vue/composition-api';

export default { title: 'BaseButton' };

export const Primary = () =>
  defineComponent({
    components: { BaseButton },
    template: `<div>
      <base-button variant="primary"/>
  </div>`,
  });

export const PrimaryOutline = () =>
  defineComponent({
    components: { BaseButton },
    template: `<div>
      <base-button variant="outline-primary"/>
  </div>`,
  });

export const Secondary = () =>
  defineComponent({
    components: { BaseButton },
    template: `<div>
      <base-button variant="secondary"/>
  </div>`,
  });

export const SecondaryOutline = () =>
  defineComponent({
    components: { BaseButton },
    template: `<div>
      <base-button variant="outline-secondary"/>
  </div>`,
  });

export const PrimaryLoading = () =>
  defineComponent({
    components: { BaseButton },
    template: `<div>
      <base-button variant="primary" loading></base-button>
  </div>`,
  });

export const PrimaryOutlineLoading = () =>
  defineComponent({
    components: { BaseButton },
    template: `<div>
      <base-button variant="outline-primary" loading></base-button>
  </div>`,
  });

export const Icon = () =>
  defineComponent({
    components: { BaseButton, SvgIcon },
    template: `<div>
      <base-button variant="icon">
          <svg-icon name="edit"/>
      </base-button>
      <base-button variant="icon" disabled>
          <svg-icon name="edit"/>
      </base-button>
  </div>`,
  });

export const Link = () =>
  defineComponent({
    components: { BaseButton },
    template: `<div>
      <base-button variant="primary" href="https://ozitag.com">
          Link to OZiTAG
      </base-button>
  </div>`,
  });
