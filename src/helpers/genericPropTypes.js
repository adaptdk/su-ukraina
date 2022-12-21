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

export { localePropType, gatsbyImagePropType, navigationPropTypes };
