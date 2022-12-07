import PropTypes from "prop-types";

import { ChipModulePropTypes } from "./ChipModulePropTypes";
import { EventsModulePropTypes } from "./EventsModulePropTypes";
import { SlidingNavBlockPropTypes } from "../SlidingNavBlock/SlidingNavBlockPropTypes";

const ContentfulModulePropTypes = PropTypes.oneOfType([
  PropTypes.shape(EventsModulePropTypes),
  PropTypes.shape(ChipModulePropTypes),
  PropTypes.shape(SlidingNavBlockPropTypes),
]);

export default ContentfulModulePropTypes;
