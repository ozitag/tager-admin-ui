import CountButton from './CountButton.vue';

export default { title: 'CountButton' };

export const Primary = () => ({
  components: { CountButton },
  template: `<div>
      <count-button variant="primary" count="3"></count-button>
  </div>`,
});

export const PrimaryOutline = () => ({
  components: { CountButton },
  template: `<div>
      <count-button variant="outline-primary" count="30">
        <span>Subcategories</span>
      </count-button>
  </div>`,
});

export const Secondary = () => ({
  components: { CountButton },
  template: `<div>
      <count-button variant="secondary" count="13"></count-button>
  </div>`,
});

export const SecondaryOutline = () => ({
  components: { CountButton },
  template: `<div>
      <count-button variant="outline-secondary" count="7"></count-button>
  </div>`,
});

export const Link = () => ({
  components: { CountButton },
  template: `<div>
      <count-button variant="primary" href="https://ozitag.com"  count="79">
          Link to OZiTAG
      </count-button>
  </div>`,
});
