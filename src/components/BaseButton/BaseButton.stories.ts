import BaseButton from './BaseButton.vue';
import SvgIcon from '../SvgIcon';

export default { title: 'BaseButton' };

export const Primary = () => ({
  components: { BaseButton },
  template: `<div>
      <BaseButton variant="primary"/>
  </div>`,
});

export const PrimaryOutline = () => ({
  components: { BaseButton },
  template: `<div>
      <BaseButton variant="outline-primary"/>
  </div>`,
});

export const Secondary = () => ({
  components: { BaseButton },
  template: `<div>
      <BaseButton variant="secondary"/>
  </div>`,
});

export const SecondaryOutline = () => ({
  components: { BaseButton },
  template: `<div>
      <BaseButton variant="outline-secondary"/>
  </div>`,
});

export const PrimaryLoading = () => ({
  components: { BaseButton },
  template: `<div>
      <BaseButton variant="primary" loading></BaseButton>
  </div>`,
});

export const PrimaryOutlineLoading = () => ({
  components: { BaseButton },
  template: `<div>
      <BaseButton variant="outline-primary" loading></BaseButton>
  </div>`,
});

export const Icon = () => ({
  components: { BaseButton, SvgIcon },
  template: `<div>
      <BaseButton variant="icon">
          <SvgIcon name="edit"/>
      </BaseButton>
      <BaseButton variant="icon" disabled>
          <SvgIcon name="edit"/>
      </BaseButton>
  </div>`,
});

export const Link = () => ({
  components: { BaseButton },
  template: `<div>
      <BaseButton variant="primary" href="https://ozitag.com">
          Link to OZiTAG
      </BaseButton>
  </div>`,
});
