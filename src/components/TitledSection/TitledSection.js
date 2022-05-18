import * as React from "react";
import PropTypes from "prop-types";

import "./TitledSection.css";
import Icon from "../Icon";

const TitledSection = ({ id = ``, children, title, icon }) => {
  return (
    <div id={id} className="TitledSection">
      <div className="TitledSection__title-wrapper">
        <h2 className="TitledSection__title">
          {!!icon && <Icon type={icon} />}
          {title}
        </h2>
      </div>
      <div className="TitledSection__content">{children}</div>
    </div>
  );
};

TitledSection.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  children: PropTypes.node,
};

export default TitledSection;
