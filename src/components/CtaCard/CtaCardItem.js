import * as React from "react";
import PropTypes from "prop-types";

const CtaCardItem = ({ label }) => {
  return (
    <div className="CtaCardItem">
      {label}
    </div>
  );
};

CtaCardItem.propTypes = {
  label: PropTypes.node,
};

export default CtaCardItem;
