import PropTypes from "prop-types";
import { ctaPropTypes } from "../../../../helpers/genericPropTypes";

const ResourceItemPropTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  cta: PropTypes.shape(ctaPropTypes).isRequired,
};

const ResourceListModulePropTypes = {
  id: PropTypes.string.isRequired,
  heading: PropTypes.string,
  resources: PropTypes.arrayOf(PropTypes.shape(ResourceItemPropTypes)),
};

const ResourceListModuleDefaultProps = {
  heading: ``,
};

export {
  ResourceItemPropTypes,
  ResourceListModuleDefaultProps,
  ResourceListModulePropTypes,
};
