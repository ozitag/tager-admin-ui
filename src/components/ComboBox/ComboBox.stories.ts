import { ref, watch, defineComponent } from "vue";
import { StoryFn } from "@storybook/vue3";

import { OptionType } from "../../typings/common";

import ComboBox from "./ComboBox.vue";

export default { title: "ComboBox" };

const OPTIONS: Array<OptionType> = [
  { value: "null", label: "Нет родительской категории", disabled: true },
  { value: "Algeria", label: "Algeria" },
  { value: "chocolate34", label: "Chocolate" },
  { value: "Zambia", label: "Zambia" },
  { value: "Zimbabwe", label: "Zimbabwe" },
  { value: "vanilla657", label: "Vanilla" },
  { value: "6", label: "something 6" },
  { value: "7", label: "something 7" },
  { value: "8", label: "something 8" },
  { value: "strawberry456", label: "Strawberry" },
  { value: "9", label: "something 9" },
  { value: "10", label: "something 10" },
  { value: "11", label: "something 11" },
  { value: "12", label: "something 12" },
  { value: "31", label: "something 1" },
  { value: "213", label: "something 2" },
  { value: "3123", label: "something 3" },
  { value: "chocolate54", label: "Chocolate" },
  { value: "4546", label: "something 4" },
  { value: "534", label: "something 5" },
  { value: "vanilla42", label: "Vanilla" },
  { value: "6234", label: "something 6" },
  { value: "7567", label: "something 7" },
  { value: "845", label: "something 8" },
  { value: "strawberry231", label: "Strawberry" },
  { value: "9323445", label: "something 9" },
  { value: "1067", label: "something 10" },
  { value: "11567", label: "something 11" },
  { value: "12345", label: "something 12" },
  { value: "17567", label: "something 1" },
  { value: "278", label: "something 2" },
  { value: "378", label: "something 3" },
  { value: "chocolate2", label: "Chocolate" },
  { value: "4567", label: "something 4" },
  { value: "5567", label: "something 5" },
  { value: "vanilla21", label: "Vanilla" },
  { value: "634", label: "something 6" },
  { value: "7867", label: "something 7" },
  { value: "8678", label: "something 8" },
  { value: "strawberry1", label: "Strawberry" },
  { value: "9345", label: "something 9" },
  { value: "1057", label: "something 10" },
  { value: "1178", label: "something 11" },
  { value: "1289", label: "something 12" },
];

export const Default: StoryFn = (args) =>
  defineComponent({
    name: "DefaultComboBox",
    components: { ComboBox },
    setup() {
      const options = ref<Array<OptionType>>(OPTIONS);
      const selected = ref<OptionType | null>(OPTIONS[OPTIONS.length - 10]);

      watch(selected, () => {
        console.log("selected", { ...selected.value });
      });

      return {
        options,
        selected,
        ...args,
      };
    },
    template: `
      <div class="scroll" style="height: 100px; overflow: auto; padding: 20px">
        <ComboBox v-model:value="selected" :options="options" :loading="loading" :clearable="true" :disabled="false" />
        <br />
        <div style="height: 700px; background-color: green"></div>
      </div>
    `,
  });

Default.args = {
  loading: false,
};

interface Country {
  name: {
    common: string;
  };
}

export const Ajax = () =>
  defineComponent({
    name: "AjaxComboBox",
    components: { ComboBox },
    setup() {
      const isLoading = ref<boolean>(false);
      const options = ref<Array<OptionType>>([]);
      const selected = ref<OptionType | null>(null);

      function fetchCountries(value: string) {
        isLoading.value = true;

        const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(
          value
        )}`;

        fetch(url)
          .then<Array<Country>>((response) => response.json())
          .then((body) => {
            isLoading.value = false;
            console.log("body", body);

            const data = body.map((country) => ({
              label: country.name.common,
              value: country.name.common,
            }));

            options.value = data;
          })
          .catch((error) => {
            isLoading.value = false;
            console.error(error);
          });
      }

      function handleChange(value: OptionType) {
        isLoading.value = false;
        // selected.value = value;
        options.value = [];
      }

      return {
        options,
        selected,
        isLoading,
        fetchCountries,
        handleChange,
      };
    },
    template: `
    <div style="height: 200px; overflow: auto; padding: 20px">
      <ComboBox
        v-model:value="selected"
        :options="options"
        :clearable="true"
        @change="handleChange"
        @change:query="fetchCountries"
        :loading="isLoading"
        :filterable="false"
      />
      <br />
      <div style="background-color: #0c5460; height: 2000px">1</div>
    </div>
  `,
  });

export const CommonSelect = () =>
  defineComponent({
    name: "DefaultComboBox",
    components: { ComboBox },
    setup() {
      const options = ref<Array<OptionType>>(OPTIONS);
      const selected = ref<OptionType | null>(OPTIONS[OPTIONS.length - 10]);

      return {
        options,
        selected,
      };
    },
    template: `
      <div class="scroll" style="height: 100px; overflow: auto; padding: 20px">
        <ComboBox
          v-model:value="selected"
          :options="options"
          :clearable="true"
          :disabled="false"
          :searchable="false"
        />
        <br />
        <div style="height: 700px; background-color: green"></div>
      </div>
    `,
  });
