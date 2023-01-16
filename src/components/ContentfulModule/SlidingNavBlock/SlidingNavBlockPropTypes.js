import PropTypes from "prop-types";
import { ChipModulePropTypes } from "../ChipModule";

const SlidingNavBlockPropTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  children: PropTypes.node,
  data: PropTypes.oneOfType([PropTypes.shape(ChipModulePropTypes)]),
};

export { SlidingNavBlockPropTypes };
