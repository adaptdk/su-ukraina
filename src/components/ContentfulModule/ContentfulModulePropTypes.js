import PropTypes from "prop-types";

import { ChipModulePropTypes } from "./ChipModule";
import { EventsModulePropTypes } from "./EventsModule";
import { LinkCollectionModulePropTypes } from "./LinkCollectionModule";
import {
  ResourceListModulePropTypes,
  ResourceItemPropTypes,
} from "./ResourceListModule";
import { SlidingNavBlockPropTypes } from "./SlidingNavBlock/SlidingNavBlockPropTypes";
import { HelpSearchPropTypes } from "../HelpSearch";
import { PartnersModulePropTypes } from "./PartnersModule";

// @todo: add faq categories module
const ContentfulModulePropTypes = PropTypes.oneOfType([
  PropTypes.shape(EventsModulePropTypes),
  PropTypes.shape(ChipModulePropTypes),
  PropTypes.shape(ResourceListModulePropTypes),
  PropTypes.shape(SlidingNavBlockPropTypes),
  PropTypes.shape(ResourceItemPropTypes),
  PropTypes.shape(LinkCollectionModulePropTypes),
  PropTypes.shape(HelpSearchPropTypes),
  PropTypes.shape(PartnersModulePropTypes),
]);

export default ContentfulModulePropTypes;
