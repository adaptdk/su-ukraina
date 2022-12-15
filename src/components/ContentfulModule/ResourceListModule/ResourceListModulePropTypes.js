import PropTypes from "prop-types";

const ResourceItemPropTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  sourceUrl: PropTypes.string.isRequired,
};

const ResourceListModulePropTypes = {
  id: PropTypes.string.isRequired,
  heading: PropTypes.string,
  subheading: PropTypes.shape({
    raw: PropTypes.string,
  }),
  resources: PropTypes.arrayOf(PropTypes.shape(ResourceItemPropTypes)),
};

const ResourceListModuleDefaultProps = {
  heading: ``,
  subheading: {
    raw: ``,
  },
};

export {
  ResourceItemPropTypes,
  ResourceListModuleDefaultProps,
  ResourceListModulePropTypes,
};
