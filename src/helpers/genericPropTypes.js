import PropTypes from "prop-types";

const seoPropTypes = {
  pageTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const localePropType = PropTypes.oneOf([`lt-LT`, `uk-UA`]);

export { seoPropTypes, localePropType };
