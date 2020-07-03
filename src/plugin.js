import BaseButton from './components/BaseButton';
import BaseCheckbox from './components/BaseCheckbox';
import FormFieldCheckbox from './components/FormFieldCheckbox';
import FormField from './components/FormField';
import FormFieldError from './components/FormFieldError';
import BaseInput from './components/BaseInput';
import BaseTextArea from './components/BaseTextArea';
import InputLabel from './components/InputLabel';
import PageTitle from './components/PageTitle';
import Spinner from './components/Spinner';
import SvgIcon from './components/SvgIcon';
import Table from './components/Table';
import TableCell from './components/Table/components/Cell';
import FormGroup from './components/FormGroup';
import FileInput from './components/FileInput';
import FormFieldFileInput from './components/FormFieldFileInput';
import FormFieldRichTextInput from './components/FormFieldRichTextInput';
import BaseRichTextInput from './components/BaseRichTextInput';
import MultiSelect from './components/MultiSelect';
import FormFieldMultiSelect from './components/FormFieldMultiSelect';
import FormFieldUrlAliasInput from './components/FormFieldUrlAliasInput';
import { ToastProvider } from './components/Toast';
import NavigationGrid from './components/NavigationGrid';

export function AdminUiPlugin(Vue) {
  Vue.component('base-button', BaseButton);
  Vue.component('base-checkbox', BaseCheckbox);
  Vue.component('base-input', BaseInput);
  Vue.component('base-table', Table);
  Vue.component('base-table-cell', TableCell);
  Vue.component('base-textarea', BaseTextArea);
  Vue.component('base-rich-text-input', BaseRichTextInput);
  Vue.component('base-file-input', FileInput);

  Vue.component('form-group', FormGroup);
  Vue.component('form-field', FormField);
  Vue.component('form-field-checkbox', FormFieldCheckbox);
  Vue.component('form-field-error', FormFieldError);
  Vue.component('form-field-rich-text-input', FormFieldRichTextInput);
  Vue.component('form-field-file-input', FormFieldFileInput);
  Vue.component('form-field-multi-select', FormFieldMultiSelect);
  Vue.component('form-field-url-alias-input', FormFieldUrlAliasInput);

  Vue.component('multi-select', MultiSelect);
  Vue.component('input-label', InputLabel);
  Vue.component('page-title', PageTitle);
  Vue.component('spinner', Spinner);
  Vue.component('svg-icon', SvgIcon);
  Vue.component('toast-provider', ToastProvider);
  Vue.component('navigation-grid', NavigationGrid);
}
