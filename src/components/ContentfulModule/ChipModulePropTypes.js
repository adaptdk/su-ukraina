import PropTypes from "prop-types";

const ChipPropTypes = {
  id: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      iconType: PropTypes.oneOf([`web`, `facebook`, `twitter`]).isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
};

const ChipModulePropTypes = {
  chips: PropTypes.arrayOf(PropTypes.shape(ChipPropTypes)).isRequired,
};

const ChipModuleDefaultProps = {
  subheading: ``,
  links: [],
};

export { ChipPropTypes, ChipModuleDefaultProps, ChipModulePropTypes };
