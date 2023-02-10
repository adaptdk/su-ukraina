import PropTypes from "prop-types";
import { FaqCategoriesPropType } from "../../Faq/FaqPropTypes";

const FaqCategoriesModulePropTypes = {
  heading: PropTypes.string,
  seeAllLink: PropTypes.string,
  categories: FaqCategoriesPropType.isRequired,
  pathname: PropTypes.string,
};

export { FaqCategoriesModulePropTypes };
