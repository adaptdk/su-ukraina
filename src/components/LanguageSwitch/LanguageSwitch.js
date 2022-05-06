import * as React from "react";
import { Link } from "gatsby";
import { useLocation } from "@gatsbyjs/reach-router";
import classNames from "classnames";

import { PATHNAMES } from "../../constants/LanguageSwitch";
import { isUkrainianPage } from "../../helpers/handlers";

import "./LanguageSwitch.css";

const LanguageSwitch = () => {
  const { pathname } = useLocation();
  const isUa = isUkrainianPage();

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

  return (
    <div className="LanguageSwitch">
      <div className="LanguageSwitch__wrapper">
        <div
          aria-haspopup="true"
          tabIndex={0}
          className="LanguageSwitch__language"
        >
          <div
            className={classNames(`LanguageSwitch__language-icon`, {
              "LanguageSwitch__language-icon--ua-flag-alt": isUa,
              "LanguageSwitch__language-icon--lt-flag": !isUa,
            })}
          ></div>
          <div className="LanguageSwitch__language-title">
            {isUa ? `UA` : `LT`}
          </div>
        </div>
        <ul className="LanguageSwitch__list">
          <li className="LanguageSwitch__list-item">
            <Link
              to={findPageLanguageSibling()}
              className={classNames(`LanguageSwitch__language`, {
                "LanguageSwitch__language--active-list-item": isUa,
              })}
            >
              <div className="LanguageSwitch__language-icon LanguageSwitch__language-icon--ua-flag-alt" />
              <div className="LanguageSwitch__language-title">UA</div>
            </Link>
          </li>
          <li className="LanguageSwitch__list-item">
            <Link
              to={findPageLanguageSibling()}
              className={classNames(`LanguageSwitch__language`, {
                "LanguageSwitch__language--active-list-item": !isUa,
              })}
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
