import { getLocaleFromPath } from "../helpers/handlers";
import LT from "../locales/lt";
import UA from "../locales/ua";
import EN from "../locales/en";

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
  // reduce() referenced from stackoverflow
  // https://stackoverflow.com/a/43849204
  return path.split(`.`).reduce((prevValue, currValue) => {
    return (prevValue && prevValue[currValue]) || null;
  }, translations);
};
