import * as React from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";

import { PATHNAMES } from "../../constants/LanguageSwitch";

import "./LanguageSwitch.css";

const LanguageSwitch = () => {
  const pathname = useLocation().pathname;
  const isUa = pathname.includes(`/ua/`);

  // @TODO think of a better name
  const findPageLanguageSibling = () => {
    const splitPathname = pathname.split(`/`);
    if (isUa) {
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

  /* @TODO use classnames library here */
  return (
    <div className="LanguageSwitch">
      <div className="LanguageSwitch__wrapper">
        <div
          aria-haspopup="true"
          tabIndex={0}
          className="LanguageSwitch__language"
        >
          <div
            className={`LanguageSwitch__language-icon ${
              isUa
                ? `LanguageSwitch__language-icon--ua-flag-alt`
                : `LanguageSwitch__language-icon--lt-flag`
            }`}
          ></div>
          <div className="LanguageSwitch__language-title">
            {isUa ? `UA` : `LT`}
          </div>
        </div>
        <ul className="LanguageSwitch__list">
          <li className="LanguageSwitch__list-item">
            <Link
              to={findPageLanguageSibling()}
              className={`LanguageSwitch__language ${
                isUa ? `LanguageSwitch__language--active-list-item` : ``
              }`}
            >
              <div className="LanguageSwitch__language-icon LanguageSwitch__language-icon--ua-flag-alt" />
              <div className="LanguageSwitch__language-title">UA</div>
            </Link>
          </li>
          <li className="LanguageSwitch__list-item">
            <Link
              to={findPageLanguageSibling()}
              className={`LanguageSwitch__language ${
                !isUa ? `LanguageSwitch__language--active-list-item` : ``
              }`}
            >
              <div className="LanguageSwitch__language-icon LanguageSwitch__language-icon--lt-flag" />
              <div className="LanguageSwitch__language-title">LT</div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LanguageSwitch;
