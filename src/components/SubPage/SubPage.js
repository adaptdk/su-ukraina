import * as React from "react";
import PropTypes from "prop-types";

import "./SubPage.css";

const SubPage = ({ title, intro, children }) => {
  return (
    <section className="SubPage">
    <h2 className="SubPage__title">{title}</h2>
    <div className="SubPage__intro">{intro}</div>
    {children}
    </section>
  );
};

SubPage.propTypes = {
  title: PropTypes.string,
  intro: PropTypes.string,
  children: PropTypes.node,
};

export default SubPage;
