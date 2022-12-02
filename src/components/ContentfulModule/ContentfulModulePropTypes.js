import PropTypes from "prop-types";

import { EventsModulePropTypes } from "./EventsModulePropTypes";

const ContentfulModulePropTypes = PropTypes.oneOfType([
  PropTypes.shape(EventsModulePropTypes),
]);

export default ContentfulModulePropTypes;
