import PropTypes from "prop-types";

const ChipPropTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string,
  webUrl: PropTypes.string,
  facebookUrl: PropTypes.string,
  twitterUrl: PropTypes.string,
};

const ChipModulePropTypes = {
  chips: PropTypes.arrayOf(PropTypes.shape(ChipPropTypes)).isRequired,
};

const ChipModuleDefaultProps = {
  subheading: ``,
  webUrl: ``,
  facebookUrl: ``,
  twitterUrl: ``,
};

export { ChipPropTypes, ChipModuleDefaultProps, ChipModulePropTypes };
