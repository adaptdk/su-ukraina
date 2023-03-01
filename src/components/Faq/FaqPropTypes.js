import PropTypes from "prop-types";

import { ResourceListModulePropTypes } from "../ContentfulModule/ResourceListModule";
import { gatsbyImagePropType } from "../../helpers/genericPropTypes";

const FaqCategoriesPropType = PropTypes.arrayOf(
  PropTypes.shape({
    content: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.shape(ResourceListModulePropTypes)])
    ),
    heroImage: gatsbyImagePropType,
    iconType: PropTypes.string,
    id: PropTypes.string,
    metaDescription: PropTypes.string,
    metaTitle: PropTypes.string,
    pageDescription: PropTypes.shape({
      raw: PropTypes.string,
    }),
    pageHeading: PropTypes.string,
    slug: PropTypes.string,
  })
);

export { FaqCategoriesPropType };
