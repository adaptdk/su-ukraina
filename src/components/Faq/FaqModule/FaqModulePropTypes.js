import PropTypes from "prop-types";

import { ResourceListModulePropTypes } from "../../ContentfulModule/ResourceListModule";
import { FaqItemPropTypes } from "./FaqItem";

const FaqModulePropTypes = {
  module: PropTypes.oneOfType([
    PropTypes.shape(ResourceListModulePropTypes),
    PropTypes.shape(FaqItemPropTypes),
  ]).isRequired,
  index: PropTypes.number.isRequired,
};

export { FaqModulePropTypes };
