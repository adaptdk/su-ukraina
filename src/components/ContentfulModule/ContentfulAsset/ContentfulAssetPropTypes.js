import PropTypes from "prop-types";
import { gatsbyImagePropType } from "../../../helpers/genericPropTypes";

const ContentfulAssetPropTypes = {
  file: PropTypes.shape({
    contentType: PropTypes.string,
  }),
  gatsbyImageData: gatsbyImagePropType,
};

export { ContentfulAssetPropTypes };
