import * as React from "react";
import { Link } from "gatsby";
import classNames from "classnames";

import { getLocaleFromPath } from "../../helpers/handlers";

import "./LanguageSwitch.css";
import {
  nodeSlugsDefaultProps,
  nodeSlugsPropTypes,
} from "../../helpers/genericPropTypes";

const LanguageSwitch = ({ currentNodeSlugs }) => {
  const locale = getLocaleFromPath();
  const isUa = locale === `uk-UA`;
  const isEn = locale === `en-US`;
  const isLt = locale === `lt-LT`;

  // @TODO think of a better name
  const findLocalisedPath = (goToLang) => {
    switch (goToLang) {
      case `uk-UA`:
        if (currentNodeSlugs?.[`uk-UA`]) {
          return `/ua/${currentNodeSlugs[`uk-UA`]}`;
        }
        return `/ua`;
      case `en-US`:
        if (currentNodeSlugs?.[`en-US`]) {
          return `/en/${currentNodeSlugs[`en-US`]}`;
        }
        return `/en`;
      case `lt-LT`:
        if (currentNodeSlugs?.[`lt-LT`]) {
          return `/${currentNodeSlugs[`lt-LT`]}`;
        }
        return `/`;
      default:
        return `/`;
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
              "LanguageSwitch__language-icon--lt-flag": isLt,
              "LanguageSwitch__language-icon--en-flag": isEn,
            })}
          ></div>
          <div className="LanguageSwitch__language-title">
            {isUa && `UA`}
            {isLt && `LT`}
            {isEn && `EN`}
          </div>
        </div>
        <ul className="LanguageSwitch__list">
          <li className="LanguageSwitch__list-item">
            <Link
              to={findLocalisedPath(`uk-UA`)}
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
              to={findLocalisedPath(`lt-LT`)}
              className={classNames(`LanguageSwitch__language`, {
                "LanguageSwitch__language--active-list-item": isLt,
              })}
            >
              <div className="LanguageSwitch__language-icon LanguageSwitch__language-icon--lt-flag" />
              <div className="LanguageSwitch__language-title">LT</div>
            </Link>
          </li>
          <li className="LanguageSwitch__list-item">
            <Link
              to={findLocalisedPath(`en-US`)}
              className={classNames(`LanguageSwitch__language`, {
                "LanguageSwitch__language--active-list-item": isEn,
              })}
            >
              <div className="LanguageSwitch__language-icon LanguageSwitch__language-icon--en-flag" />
              <div className="LanguageSwitch__language-title">EN</div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

LanguageSwitch.propTypes = {
  currentNodeSlugs: nodeSlugsPropTypes,
};

LanguageSwitch.defaultProps = {
  currentNodeSlugs: nodeSlugsDefaultProps,
};

export default LanguageSwitch;
