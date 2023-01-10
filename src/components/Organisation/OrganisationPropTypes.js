import PropTypes from "prop-types";
import { gatsbyImagePropType } from "../../helpers/genericPropTypes";

const OrganisationPropTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  organisationType: PropTypes.oneOf([`Donation`, `Volunteering`]).isRequired,
  organisationLogo: PropTypes.shape(gatsbyImagePropType),
  location: PropTypes.oneOf([`Lithuania`, `Foreign`]).isRequired,
  description: PropTypes.shape({
    raw: PropTypes.string,
  }),
  purpose: PropTypes.shape({
    raw: PropTypes.string,
  }),
  otherInformation: PropTypes.shape({
    raw: PropTypes.string,
  }),
  actionUrl: PropTypes.string,
  websiteUrl: PropTypes.string,
};

export { OrganisationPropTypes };
