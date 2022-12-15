import React from "react";
import PropTypes from "prop-types";

import Button from "../Button";
import { getTranslatedText } from "../../utils/getTranslatedText";

const OrganisationActions = ({ actionUrl, websiteUrl, type }) => {
  if (!actionUrl && !websiteUrl) {
    return null;
  }

  return (
    <div className="Card__actions">
      {actionUrl && (
        <Button
          endIcon={`arrow-white`}
          href={actionUrl}
          color={`primary`}
          target="_blank"
        >
          {type === `Volunteering` && getTranslatedText(`actions.applyForm`)}
          {type === `Donation` && getTranslatedText(`actions.donate`)}
        </Button>
      )}
      {websiteUrl && (
        <Button
          endIcon={`arrow-blue`}
          href={websiteUrl}
          color={`transparent`}
          target="_blank"
        >
          {getTranslatedText(`actions.officialPage`)}
        </Button>
      )}
    </div>
  );
};

OrganisationActions.propTypes = {
  actionUrl: PropTypes.string,
  websiteUrl: PropTypes.string,
  type: PropTypes.oneOf([`Volunteering`, `Donation`]).isRequired,
};

OrganisationActions.defaultProps = {
  actionUrl: ``,
  websiteUrl: ``,
};

export default OrganisationActions;
