import React from "react";
import PropTypes from "prop-types";

import CardList from "../CardList";
import Card from "../Card";
import CardSection from "../Card/CardSection";
import { OrganisationPropTypes } from "./OrganisationPropTypes";
import OrganisationActions from "./OrganisationActions";

import { localePropType } from "../../helpers/genericPropTypes";

const CardListSection = ({ organisations, locale }) => {
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
          return (
            <Card
              title={name}
              locale={locale}
              organisationType={organisationType}
              logo={organisationLogo}
              key={id}
            >
              {!!description?.raw && (
                <CardSection title="Apie" content={description} />
              )}
              {!!purpose?.raw && (
                <CardSection title="Paskirtis" content={purpose} />
              )}
              {!!otherInformation?.raw && (
                <CardSection
                  title="Kita informacija"
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
