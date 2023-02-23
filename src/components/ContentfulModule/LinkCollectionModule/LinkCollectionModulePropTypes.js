import PropTypes from "prop-types";

const LinkCollectionModulePropTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
  variant: PropTypes.oneOf([`default`, `light-blocks`, `with-image`]),
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const LinkCollectionModuleDefaultProps = {
  heading: ``,
  subheading: ``,
  variant: `default`,
};

export { LinkCollectionModulePropTypes, LinkCollectionModuleDefaultProps };
