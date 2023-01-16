import React from "react";
import PropTypes from "prop-types";

import {
  TRANSLATIONS,
  POSSIBLE_SEARCH_LANGS,
} from "../../constants/HelpSearch";

const LangSwitcher = ({ resultsLang, handleSearchLangChange, name }) => {
  return (
    <div className="HelpSearch__LangSwitcher">
      <i>{TRANSLATIONS.langSwitcher.language[resultsLang]}</i>
      {POSSIBLE_SEARCH_LANGS.map((lang) => {
        return (
          <label key={lang} aria-label={lang.toUpperCase()}>
            <input
              checked={resultsLang === lang}
              name={name}
              onChange={handleSearchLangChange}
              type="radio"
              value={lang}
            />
            {` `}
            <span>
              {lang
                .toUpperCase()
                .replace(`LT`, `Lietuvių`)
                .replace(`EN`, `English`)
                .replace(`UK`, `Українська`)}
            </span>
            <span>{lang.toUpperCase()}</span>
          </label>
        );
      })}
    </div>
  );
};

LangSwitcher.propTypes = {
  name: PropTypes.string.isRequired,
  resultsLang: PropTypes.string,
  handleSearchLangChange: PropTypes.func,
};

export default LangSwitcher;
