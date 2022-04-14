import * as React from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";

import { PATHNAMES } from "../../constants/LanguageSwitch";

import "./LanguageSwitch.css";

const LanguageSwitch = () => {
  const pathname = useLocation().pathname;
  const currentLanguage = pathname.includes(`/ua/`) ? `ua` : `lt`;

  // @TODO think of a better name
  const findPageLanguageSibling = () => {
    const splitPathname = pathname.split(`/`);
    if (currentLanguage === `ua`) {
      const found = PATHNAMES.find((object) => {
        return object.ua === splitPathname[2];
      });
      if (found) {
        return `/${found.lt}/`;
      }
      return `/`;
    } else {
      const found = PATHNAMES.find((object) => {
        return object.lt === splitPathname[1];
      });
      if (found) {
        return `/ua/${found.ua}/`;
      }
      return `/ua/refugee-guide`;
    }
  };

  return (
    <div className="LanguageSwitch">
      {/* @TODO use classnames library here */}
      <Link
        to={findPageLanguageSibling()}
        className={`LanguageSwitch__language ${
          currentLanguage === `ua` ? `LanguageSwitch__language--active` : ``
        }`}
      >
        <div className="LanguageSwitch__language-icon LanguageSwitch__language-icon--ua-flag-alt" />
        <div className="LanguageSwitch__language-title">UA</div>
      </Link>
      <Link
        to={findPageLanguageSibling()}
        className={`LanguageSwitch__language ${
          currentLanguage === `lt` ? `LanguageSwitch__language--active` : ``
        }`}
      >
        <div className="LanguageSwitch__language-icon LanguageSwitch__language-icon--lt-flag" />
        <div className="LanguageSwitch__language-title">LT</div>
      </Link>
    </div>
  );
};

export default LanguageSwitch;
