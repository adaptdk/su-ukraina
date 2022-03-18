import * as React from "react";
import PropTypes from "prop-types";

import "./ResourceList.css";

const ResourceList = ({ title, children }) => {
  return (
    <section className="ResourceList">
      {!!title && <h3 className="ResourceList__title">{title}</h3>}
      <ul className="ResourceList__list">{children}</ul>
    </section>
  );
};

ResourceList.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default ResourceList;
