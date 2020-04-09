import * as RNLocalize from 'react-native-localize';
import { I18nManager } from 'react-native';
import I18n from 'i18n-js';

import en from '~/i18n/en.json';
import zh from '~/i18n/zh.json';

I18nManager.allowRTL(false);

const locales = RNLocalize.getLocales();
if (Array.isArray(locales)) {
  I18n.locale = 'zh' || locales[0].languageCode;
}

I18n.fallbacks = true;
I18n.translations = {
  en,
  zh,
};

export default I18n;
