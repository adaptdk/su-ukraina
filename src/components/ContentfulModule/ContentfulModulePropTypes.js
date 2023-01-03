import PropTypes from "prop-types";

import { ChipModulePropTypes } from "./ChipModule";
import { EventsModulePropTypes } from "./EventsModule";
import { LinkCollectionModulePropTypes } from "./LinkCollectionModule";
import {
  ResourceListModulePropTypes,
  ResourceItemPropTypes,
} from "./ResourceListModule";
import { SlidingNavBlockPropTypes } from "./SlidingNavBlock/SlidingNavBlockPropTypes";

const ContentfulModulePropTypes = PropTypes.oneOfType([
  PropTypes.shape(EventsModulePropTypes),
  PropTypes.shape(ChipModulePropTypes),
  PropTypes.shape(ResourceListModulePropTypes),
  PropTypes.shape(SlidingNavBlockPropTypes),
  PropTypes.shape(ResourceItemPropTypes),
  PropTypes.shape(LinkCollectionModulePropTypes),
]);

export default ContentfulModulePropTypes;
