import SeoFieldGroup from './SeoFieldGroup.vue';
import { defineComponent, ref } from '@vue/composition-api';
import { createId } from '@tager/admin-services';
import { SeoChangeEvent, SingleFileInputValueType } from '../../typings/common';

export default { title: 'SeoFieldGroup' };

const TEST_FILE: SingleFileInputValueType = {
  id: createId(),
  file: {
    id: '174',
    mime: 'image/jpeg',
    name: 'e0cbc508796c2af24357b5f056aa2bdb0000033333.jpg',
    size: 386793,
    url: 'https://new.ozitag.com/uploads/tmp/zx/0q/Zx0qap7Hvw.jpg',
  },
  caption: 'Caption text',
};

interface ValuesState {
  pageTitle: string;
  pageDescription: string;
  keywords: string;
  openGraphImage: SingleFileInputValueType | null;
}

export const Default = () =>
  defineComponent({
    name: 'DefaultSeoFieldGroup',
    components: { SeoFieldGroup },
    setup() {
      const values = ref<ValuesState>({
        pageTitle: 'title',
        pageDescription: 'description',
        keywords: 'keywords',
        openGraphImage: TEST_FILE,
      });

      function handleSearchEngineOptimization({
        title,
        description,
        keywords,
        image,
      }: SeoChangeEvent) {
        // values.value.pageTitle = title;
        // values.value.pageDescription = description;
        // values.value.openGraphImage = image;
      }

      // or

      function handleSEOTitle(value: string) {
        values.value.pageTitle = value;
      }

      function handleSEODescription(value: string) {
        values.value.pageDescription = value;
      }

      function handleSEOKeywords(value: string) {
        values.value.keywords = value;
      }

      function handleSEOImage(value: SingleFileInputValueType | null) {
        values.value.openGraphImage = value;
      }

      return {
        values,
        handleSEOTitle,
        handleSEODescription,
        handleSEOKeywords,
        handleSEOImage,
        handleSearchEngineOptimization,
      };
    },
    template: `
      <SeoFieldGroup
        :title="values.pageTitle"
        @change:title="handleSEOTitle"
        :description="values.pageDescription"
        @change:description="handleSEODescription"

        :should-display-keywords="true"
        :keywords="values.keywords"
        @change:keywords="handleSEOKeywords"
        
        :image="values.openGraphImage"
        @change:image="handleSEOImage"
        @change="handleSearchEngineOptimization"
      />
    `,
  });
