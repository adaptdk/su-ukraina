import PropTypes from "prop-types";
import { linkPropTypes } from "../../../../helpers/genericPropTypes";

const FaqItemPropTypes = {
  id: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.shape({
    raw: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  additionalLink: linkPropTypes,
};

export { FaqItemPropTypes };
