import PropTypes from "prop-types";
import { gatsbyImagePropType } from "../../helpers/genericPropTypes";

const HeroSectionPropTypes = {
  heroTitle: PropTypes.string,
  heroImage: gatsbyImagePropType,
};

const HeroSectionDefaultProps = {
  heroTitle: ``,
};

export { HeroSectionPropTypes, HeroSectionDefaultProps };
