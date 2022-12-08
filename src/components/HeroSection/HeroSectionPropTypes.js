import PropTypes from "prop-types";

const HeroSectionPropTypes = {
  image: PropTypes.shape({
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
  }).isRequired,
};

export { HeroSectionPropTypes };
