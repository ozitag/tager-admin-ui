import BaseButton from './index.vue';
import SvgIcon from '../SvgIcon';

export default { title: 'BaseButton' };

export const Primary = () => ({
  components: { BaseButton },
  template: `<div>
      <base-button variant="primary"/>
  </div>`,
});

export const PrimaryOutline = () => ({
  components: { BaseButton },
  template: `<div>
      <base-button variant="outline-primary"/>
  </div>`,
});

export const Secondary = () => ({
  components: { BaseButton },
  template: `<div>
      <base-button variant="secondary"/>
  </div>`,
});

export const SecondaryOutline = () => ({
  components: { BaseButton },
  template: `<div>
      <base-button variant="outline-secondary"/>
  </div>`,
});

export const PrimaryLoading = () => ({
  components: { BaseButton },
  template: `<div>
      <base-button variant="primary" loading></base-button>
  </div>`,
});

export const PrimaryOutlineLoading = () => ({
  components: { BaseButton },
  template: `<div>
      <base-button variant="outline-primary" loading></base-button>
  </div>`,
});

export const Icon = () => ({
  components: { BaseButton, SvgIcon },
  template: `<div>
      <base-button variant="icon">
          <svg-icon name="menu"/>
      </base-button>
  </div>`,
});

export const Link = () => ({
  components: { BaseButton },
  template: `<div>
      <base-button variant="primary" href="https://ozitag.com">
          Link to OZiTAG
      </base-button>
  </div>`,
});
