import { PluginFunction } from 'vue';

import BaseButton from './components/BaseButton';
import BaseCheckbox from './components/BaseCheckbox/index.vue';
import FormFieldCheckbox from './components/FormFieldCheckbox/index.vue';
import FormField from './components/FormField/index.vue';
import FormFieldError from './components/FormFieldError/index.vue';
import BaseInput from './components/BaseInput';
import BaseTextArea from './components/BaseTextArea';
import InputLabel from './components/InputLabel/index.vue';
import PageTitle from './components/PageTitle/index.vue';
import Spinner from './components/Spinner/index.vue';
import SvgIcon from './components/SvgIcon';
import Table from './components/Table';
import TableCell from './components/Table/components/Cell.vue';
import FormGroup from './components/FormGroup.vue';
import FileInput from './components/FileInput/index.vue';
import FormFieldFileInput from './components/FormFieldFileInput/index.vue';
import NumberInput from './components/NumberInput/index.vue';
import FormFieldNumberInput from './components/FormFieldNumberInput/index.vue';
import FormFieldColorInput from './components/FormFieldColorInput/index.vue';
import FormFieldRichTextInput from './components/FormFieldRichTextInput/index.vue';
import BaseRichTextInput from './components/BaseRichTextInput/index.vue';
import MultiSelect from './components/MultiSelect/index.vue';
import FormFieldMultiSelect from './components/FormFieldMultiSelect/index.vue';
import FormFieldUrlAliasInput from './components/FormFieldUrlAliasInput';
import { ToastProvider } from './components/Toast';
import NavigationGrid from './components/NavigationGrid/index.vue';
import LoadableImage from './components/LoadableImage/index.vue';
import DropdownMenu from './components/DropdownMenu/index.vue';
import BaseSelect from './components/BaseSelect/index.vue';
import FormFieldSelect from './components/FormFieldSelect/index.vue';
import FormFieldSingleSelect from './components/FormFieldSingleSelect/index.vue';
import TabList from './components/TabList';
import ColorInput from './components/ColorInput';
import ButtonField from './components/ButtonField';
import DateTimeInput from './components/DateTimeInput';
import MapField from './components/MapField';
import ShortCodeConstructor from './components/ShortCodeConstructor';
import CountButton from './components/CountButton';
import FormFieldRecommendedLengthInput from './components/FormFieldRecommendedLengthInput';

export const AdminUiPlugin: PluginFunction<any> = (Vue) => {
  Vue.component('base-button', BaseButton);
  Vue.component('base-checkbox', BaseCheckbox);
  Vue.component('base-input', BaseInput);
  Vue.component('base-select', BaseSelect);
  Vue.component('base-table', Table);
  Vue.component('base-table-cell', TableCell);
  Vue.component('base-textarea', BaseTextArea);
  Vue.component('base-rich-text-input', BaseRichTextInput);
  Vue.component('base-file-input', FileInput);
  Vue.component('base-number-input', NumberInput);
  Vue.component('base-color-input', ColorInput);

  Vue.component('form-group', FormGroup);
  Vue.component('form-field', FormField);
  Vue.component('form-field-checkbox', FormFieldCheckbox);
  Vue.component('form-field-select', FormFieldSelect);
  Vue.component('form-field-error', FormFieldError);
  Vue.component('form-field-rich-text-input', FormFieldRichTextInput);
  Vue.component('form-field-file-input', FormFieldFileInput);
  Vue.component('form-field-color-input', FormFieldColorInput);
  Vue.component('form-field-number-input', FormFieldNumberInput);
  Vue.component('form-field-multi-select', FormFieldMultiSelect);
  Vue.component('form-field-single-select', FormFieldSingleSelect);
  Vue.component('form-field-url-alias-input', FormFieldUrlAliasInput);
  Vue.component(
    'form-field-recommended-length-input',
    FormFieldRecommendedLengthInput
  );

  Vue.component('multi-select', MultiSelect);
  Vue.component('input-label', InputLabel);
  Vue.component('page-title', PageTitle);
  Vue.component('spinner', Spinner);
  Vue.component('svg-icon', SvgIcon);
  Vue.component('toast-provider', ToastProvider);
  Vue.component('navigation-grid', NavigationGrid);
  Vue.component('loadable-image', LoadableImage);
  Vue.component('dropdown-menu', DropdownMenu);
  Vue.component('tab-list', TabList);
  Vue.component('button-field', ButtonField);
  Vue.component('map-field', MapField);
  Vue.component('date-time-input', DateTimeInput);
  Vue.component('short-code-constructor', ShortCodeConstructor);
  Vue.component('count-button', CountButton);
};
