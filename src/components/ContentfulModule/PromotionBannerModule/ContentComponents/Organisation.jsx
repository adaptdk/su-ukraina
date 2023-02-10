import React from "react";

import { getTranslatedText } from "../../../../utils/getTranslatedText";
import { CardSection, OrganisationPropTypes } from "../../../Organisation";
import OrganisationActions from "../../../Organisation/OrganisationActions";

const Organisation = ({ purpose, actionUrl, websiteUrl, type }) => {
  if (!purpose) {
    return null;
  }

  return (
    <>
      <CardSection
        title={getTranslatedText(`organisation.purpose`)}
        content={purpose}
      />
      <OrganisationActions
        actionUrl={actionUrl}
        websiteUrl={websiteUrl}
        type={type}
      />
    </>
  );
};

Organisation.propTypes = OrganisationPropTypes;

export default Organisation;
