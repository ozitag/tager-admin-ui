import CountButton from './CountButton.vue';
import { defineComponent } from '@vue/composition-api';

export default { title: 'CountButton' };

export const Primary = () =>
  defineComponent({
    components: { CountButton },
    template: `<div>
    <count-button variant="primary" :count="777777777"></count-button>
    <count-button variant="primary" :count="777777777" :loading="true"></count-button>
  </div>`,
  });

export const PrimaryOutline = () =>
  defineComponent({
    components: { CountButton },
    template: `<div>
    <CountButton variant="outline-primary" :count="0">
      <span>Subcategories</span>
    </CountButton>
    <CountButton variant="outline-primary" :count="0" :loading="true">
      <span>Subcategories</span>
    </CountButton>
  </div>`,
  });

export const Secondary = () =>
  defineComponent({
    components: { CountButton },
    template: `<div>
    <CountButton variant="secondary" :count="13"></CountButton>
    <CountButton variant="secondary" :count="13" :loading="true"></CountButton>
  </div>`,
  });

export const SecondaryOutline = () =>
  defineComponent({
    components: { CountButton },
    template: `<div>
    <CountButton variant="outline-secondary" :count="7"></CountButton>
  </div>`,
  });

export const Link = () =>
  defineComponent({
    components: { CountButton },
    template: `<div>
    <CountButton variant="primary" href="https://ozitag.com" :count="79">
      Link to OZiTAG
    </CountButton>
  </div>`,
  });
