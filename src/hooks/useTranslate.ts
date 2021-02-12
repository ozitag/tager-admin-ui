import { SetupContext } from '@vue/composition-api';
import { TFunction } from 'i18next';

function useTranslate(context: SetupContext): { t: TFunction } {
  function t(...args: Parameters<TFunction>): ReturnType<TFunction> {
    const tFunction = context.root.$t;
    if (typeof tFunction === 'function') {
      return tFunction(...args);
    } else {
      console.error('Translate function is not defined');
      return args[0];
    }
  }

  return { t };
}

export default useTranslate;
