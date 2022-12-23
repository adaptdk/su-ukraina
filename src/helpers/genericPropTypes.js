import PropTypes from "prop-types";

const localePropType = PropTypes.oneOf([`lt-LT`, `uk-UA`, `en`]);

const gatsbyImagePropType = PropTypes.shape({
  gatsbyImageData: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    images: PropTypes.shape({
      sources: PropTypes.arrayOf(
        PropTypes.shape({
          sizes: PropTypes.string,
          srcSet: PropTypes.string,
          type: PropTypes.string,
        })
      ),
    }),
    layout: PropTypes.string,
    placeholder: PropTypes.shape({
      fallback: PropTypes.string,
    }),
  }),
});

const navigationPropTypes = PropTypes.shape({
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          slug: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        })
      ),
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
  node_locale: localePropType.isRequired,
});

const nodeSlugsPropTypes = PropTypes.shape({
  [`lt-LT`]: PropTypes.string,
  [`uk-UA`]: PropTypes.string,
  [`en`]: PropTypes.string,
});

const nodeSlugsDefaultProps = {
  [`lt-LT`]: null,
  [`uk-UA`]: null,
  [`en`]: null,
};

export {
  localePropType,
  gatsbyImagePropType,
  navigationPropTypes,
  nodeSlugsPropTypes,
  nodeSlugsDefaultProps,
};
