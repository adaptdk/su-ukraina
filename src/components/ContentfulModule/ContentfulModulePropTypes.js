import PropTypes from "prop-types";
import { ChipModulePropTypes } from "./ChipModulePropTypes";

import { EventsModulePropTypes } from "./EventsModulePropTypes";

const ContentfulModulePropTypes = PropTypes.oneOfType([
  PropTypes.shape(EventsModulePropTypes),
  PropTypes.shape(ChipModulePropTypes),
]);

export default ContentfulModulePropTypes;
