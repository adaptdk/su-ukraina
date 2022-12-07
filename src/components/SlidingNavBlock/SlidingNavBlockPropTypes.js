import PropTypes from "prop-types";
import ContentfulModulePropTypes from "../ContentfulModule/ContentfulModulePropTypes";

const SlidingNavBlockPropTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  children: PropTypes.node,
  data: PropTypes.shape(ContentfulModulePropTypes),
};

export { SlidingNavBlockPropTypes };
