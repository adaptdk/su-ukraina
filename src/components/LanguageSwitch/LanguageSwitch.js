import * as React from "react";
import { useLocation } from "@reach/router";

import "./LanguageSwitch.css";

const LanguageSwitch = () => {
  const location = useLocation();
  const currentLanguage = location.pathname.includes(`/ua/`) ? `ua` : `lt`;

  return (
    <div className="LanguageSwitch">
      <div
        className={`LanguageSwitch__language ${
          currentLanguage === `ua` ? `LanguageSwitch__language--active` : ``
        }`}
      >
        <div className="LanguageSwitch__language-icon LanguageSwitch__language-icon--ua-flag-alt" />
        <div className="LanguageSwitch__language-title">UA</div>
      </div>
      <div
        className={`LanguageSwitch__language ${
          currentLanguage === `lt` ? `LanguageSwitch__language--active` : ``
        }`}
      >
        <div className="LanguageSwitch__language-icon LanguageSwitch__language-icon--lt-flag" />
        <div className="LanguageSwitch__language-title">LT</div>
      </div>
    </div>
  );
};

export default LanguageSwitch;
