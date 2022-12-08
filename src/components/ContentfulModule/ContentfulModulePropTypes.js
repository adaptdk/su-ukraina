import PropTypes from "prop-types";

import { ChipModulePropTypes } from "./ChipModule";
import { EventsModulePropTypes } from "./EventsModule";
// import { SlidingNavBlockPropTypes } from "./SlidingNavBlock";

const ContentfulModulePropTypes = PropTypes.oneOfType([
  PropTypes.shape(EventsModulePropTypes),
  PropTypes.shape(ChipModulePropTypes),
  // PropTypes.shape(SlidingNavBlockPropTypes),
]);

export default ContentfulModulePropTypes;
