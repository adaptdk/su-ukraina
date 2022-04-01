import React from "react";
import "./DetailsWrapper.css";
import PropTypes from "prop-types";

const DetailsWrapper = ({ tag, summary, children }) => {
  const Tag = tag;

  return (
    <details className="DetailsWrapper">
      <summary className="DetailsWrapper__summary-wrapper">
        <Tag className="DetailsWrapper__summary-title">{summary}</Tag>
      </summary>
      {children}
    </details>
  );
};

DetailsWrapper.propTypes = {
  tag: PropTypes.string,
  summary: PropTypes.string,
  children: PropTypes.node,
};

export default DetailsWrapper;
