import { isUkrainianPage } from "../helpers/handlers";
import LT from "../locales/lt";
import UA from "../locales/ua";

export const getTranslatedText = (path) => {
  const translations = isUkrainianPage() ? UA : LT;
  // reduce() referenced from stackoverflow
  // https://stackoverflow.com/a/43849204
  return path.split(`.`).reduce((prevValue, currValue) => {
    return (prevValue && prevValue[currValue]) || null;
  }, translations);
};
