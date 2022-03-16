import * as React from "react";
import PropTypes from "prop-types";
import Button from "../Button";

const PositiveNegativeListItem = ({ description, type, source}) => {
  return (
    <div className="PositiveNegativeListItem" data-type={type}>
        <div className="PositiveNegativeListItem__content">
          {!!source && <a className="src" href={source}>Source</a>} 
          {!!description && <p>{description}</p>}
        </div>
    </div>
  );
};

PositiveNegativeListItem.propTypes = {
  description: PropTypes.string,
  type: PropTypes.string,
  source: PropTypes.string,
};


export default PositiveNegativeListItem;
