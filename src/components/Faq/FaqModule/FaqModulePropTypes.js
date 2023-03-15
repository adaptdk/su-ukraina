import PropTypes from "prop-types";

import { ResourceListModulePropTypes } from "../../ContentfulModule/ResourceListModule";
import { FaqItemPropTypes } from "./FaqItem/FaqItemPropTypes";

const FaqModulePropTypes = {
  module: PropTypes.oneOfType([
    PropTypes.shape(ResourceListModulePropTypes),
    PropTypes.shape(FaqItemPropTypes),
  ]),
  index: PropTypes.number,
};

export { FaqModulePropTypes };
