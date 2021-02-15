import { PluginFunction } from 'vue';
import { i18n } from '@tager/admin-services';

import EN from './locales/en';
import RU from './locales/ru';

import BaseButton from './components/BaseButton/index.vue';
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
import Table from './components/BaseTable';
import TableCell from './components/BaseTable/components/Cell.vue';
import FormGroup from './components/FormGroup.vue';
import FileInput from './components/FileInput';
import FormFieldFileInput from './components/FormFieldFileInput/index.vue';
import NumberInput from './components/NumberInput';
import FormFieldNumberInput from './components/FormFieldNumberInput';
import FormFieldColorInput from './components/FormFieldColorInput/index.vue';
import FormFieldRichTextInput from './components/FormFieldRichTextInput/index.vue';
import BaseRichTextInput from './components/BaseRichTextInput/index.vue';
import MultiSelect from './components/MultiSelect';
import FormFieldMultiSelect from './components/FormFieldMultiSelect';
import FormFieldUrlAliasInput from './components/FormFieldUrlAliasInput';
import { ToastProvider } from './components/Toast';
import NavigationGrid from './components/NavigationGrid';
import LoadableImage from './components/LoadableImage';
import DropdownMenu from './components/DropdownMenu/index.vue';
import BaseSelect from './components/BaseSelect';
import FormFieldSelect from './components/FormFieldSelect';
import FormFieldSingleSelect from './components/FormFieldSingleSelect/index.vue';
import TabList from './components/TabList';
import ColorInput from './components/ColorInput';
import ButtonField from './components/ButtonField';
import DateTimeInput from './components/DateTimeInput';
import MapField from './components/MapField';
import ShortCodeConstructor from './components/ShortCodeConstructor';
import CountButton from './components/CountButton';
import FormFieldRecommendedLengthInput from './components/FormFieldRecommendedLengthInput';
import DataTable from './components/DataTable';
import SearchInput from './components/SearchInput';
import Pagination from './components/Pagination';
import ComboBox from './components/ComboBox';
import FormFieldComboBox from './components/FormFieldComboBox';
import FieldValue from './components/FieldValue';
import SeoFieldGroup from './components/SeoFieldGroup';
import AjaxSelect from './components/AjaxSelect';
import ColorSelect from './components/ColorSelect';
import FormFooter from './components/FormFooter';

export const AdminUiPlugin: PluginFunction<any> = (Vue) => {
  i18n.addTranslations('en', 'ui', EN);
  i18n.addTranslations('ru', 'ui', RU);

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
  Vue.component('form-field-combobox', FormFieldComboBox);

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
  Vue.component('data-table', DataTable);
  Vue.component('search-input', SearchInput);
  Vue.component('pagination', Pagination);
  Vue.component('combobox', ComboBox);
  Vue.component('field-value', FieldValue);
  Vue.component('seo-field-group', SeoFieldGroup);
  Vue.component('ajax-select', AjaxSelect);
  Vue.component('color-select', ColorSelect);
  Vue.component('form-footer', FormFooter);
};
