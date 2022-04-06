import * as React from "react";
import PropTypes from "prop-types";

import Button from "../Button";

// import SelectInput from "../SelectInput/SelectInput";

import "./ErrorPage.css";

import connectorImage from "../../images/connector.svg";

const ErrorPage = ({ title, subtitle, children }) => {
  return (
    <div className="ErrorPage">
      <div className="ErrorPage__heading">
        <h1 className="ErrorPage__title">{title}</h1>
        <div className="ErrorPage__subtitle">{subtitle}</div>
      </div>
      <div className="ErrorPage__image">
        <img src={connectorImage} />
      </div>
      <div className="ErrorPage__body">{children}</div>
    </div>
  );
};

ErrorPage.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node,
  subtitle: PropTypes.node,
};

export default ErrorPage;
