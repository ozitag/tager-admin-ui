import MainLayout from './index.vue';
import PageTitle from '@/components/PageTitle';

export default { title: 'MainLayout' };

export const Default = () => ({
  components: { MainLayout, PageTitle },
  template: `
      <div style="height: 100vh;background-color: #f9fafb;margin: -1rem;border:1px solid transparent;">
          <main-layout>
              <template v-slot:top>
                  <page-title>Page title</page-title>
              </template>
              <template v-slot:content><div style="height: 500px">Page content</div></template>
          </main-layout>
      </div>`,
});
