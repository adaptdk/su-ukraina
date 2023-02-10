import PropTypes from "prop-types";
import { gatsbyImagePropType } from "../../../helpers/genericPropTypes";
import { OrganisationPropTypes } from "../../Organisation";
import { EventItemPropTypes } from "../EventsModule";

const PromotionBannerModulePropTypes = {
  id: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  thumbnail: gatsbyImagePropType.isRequired,
  thumbnailUrl: PropTypes.string,
  content: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape(OrganisationPropTypes),
      PropTypes.shape(EventItemPropTypes),
    ])
  ),
};

const PromotionBannerModuleDefaultProps = {
  thumbnailUrl: ``,
  content: [],
};

export { PromotionBannerModuleDefaultProps, PromotionBannerModulePropTypes };
