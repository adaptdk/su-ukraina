import React from "react";
import PropTypes from "prop-types";

import CardList from "./CardList";
import { Card, CardSection } from "./Card";
import { OrganisationPropTypes } from "./OrganisationPropTypes";
import OrganisationActions from "./OrganisationActions";

import { localePropType } from "../../helpers/genericPropTypes";
import { getTranslatedText } from "../../utils/getTranslatedText";

const CardListSection = ({ organisations, locale }) => {
  if (!organisations) {
    return null;
  }

  return (
    <CardList>
      {organisations.map(
        ({
          id,
          name,
          organisationType,
          organisationLogo,
          description,
          purpose,
          otherInformation,
          websiteUrl,
          actionUrl,
        }) => {
          if (!name) {
            return null;
          }

          return (
            <Card
              title={name}
              locale={locale}
              organisationType={organisationType}
              logo={organisationLogo}
              key={id}
            >
              {!!description?.raw && (
                <CardSection
                  title={getTranslatedText(`organisation.about`)}
                  content={description}
                />
              )}
              {!!purpose?.raw && (
                <CardSection
                  title={getTranslatedText(`organisation.purpose`)}
                  content={purpose}
                />
              )}
              {!!otherInformation?.raw && (
                <CardSection
                  title={getTranslatedText(`organisation.otherInfo`)}
                  content={otherInformation}
                />
              )}
              <OrganisationActions
                actionUrl={actionUrl}
                websiteUrl={websiteUrl}
                type={organisationType}
              />
            </Card>
          );
        }
      )}
    </CardList>
  );
};

CardListSection.propTypes = {
  organisations: PropTypes.arrayOf(PropTypes.shape(OrganisationPropTypes))
    .isRequired,
  locale: localePropType.isRequired,
};

export default CardListSection;
