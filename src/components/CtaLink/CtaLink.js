import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import "./CtaLink.css";

const CtaLink = ({ title, url }) => {
  return (
    <p className="CtaLink">
      <Link
        className="CtaLink__link"
        to={url}
      >
        {title}
      </Link>
    </p>
  );
};

CtaLink.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};


export default CtaLink;
