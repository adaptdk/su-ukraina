import { getLocaleFromPath } from "../helpers/handlers";
import LT from "../locales/lt";
import UA from "../locales/ua";
import EN from "../locales/en";
import { getObjectValueByStringPath } from "../build-utils/helpers/utils";

const getTranslations = () => {
  const locale = getLocaleFromPath();

  if (locale === `uk-UA`) {
    return UA;
  }

  if (locale === `en`) {
    return EN;
  }

  return LT;
};

export const getTranslatedText = (path) => {
  const translations = getTranslations();

  return getObjectValueByStringPath(path, translations);
};
