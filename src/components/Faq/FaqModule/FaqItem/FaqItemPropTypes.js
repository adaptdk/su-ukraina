import PropTypes from "prop-types";

const FaqItemPropTypes = {
  id: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.shape({
    raw: PropTypes.string,
    references: PropTypes.array,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export { FaqItemPropTypes };
