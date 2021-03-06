import * as React from "react";
import PropTypes from "prop-types";
import Button from "../Button";

const ResourceListItem = ({ title, subtitle, url, buttonText }) => {
  return (
    <li className="ResourceListItem">
      <div className="ResourceListItem__content">
        {!!title && <h3>{title}</h3>}
        {!!subtitle && <p>{subtitle}</p>}
      </div>
      <Button
        endIcon={`arrow-blue`}
        href={url}
        color={`transparent`}
        target="_blank"
      >
        {buttonText}
      </Button>
    </li>
  );
};

ResourceListItem.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
  buttonText: PropTypes.string,
};

export default ResourceListItem;
