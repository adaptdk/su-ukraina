import * as React from "react";
// import PropTypes from "prop-types";

import "./LanguageSwitch.css";

const LanguageSwitch = () => {
  return (
    <div className="LanguageSwitch">
      <div className="LanguageSwitch__language LanguageSwitch__language--active">
        <div className="LanguageSwitch__language-icon LanguageSwitch__language-icon--ua-flag-alt" />
        <div className="LanguageSwitch__language-title">UA</div>
      </div>
      <div className="LanguageSwitch__language">
        <div className="LanguageSwitch__language-icon LanguageSwitch__language-icon--lt-flag" />
        <div className="LanguageSwitch__language-title">LT</div>
      </div>
    </div>
  );
};

// LanguageSwitch.propTypes = {};

export default LanguageSwitch;
