import * as React from "react";
import PropTypes from "prop-types";

import Button from "../../components/Button";
import CardSection from "../../components/Card/CardSection";
import Card from "../../components/Card";
import CardList from "../../components/CardList";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import "./Tabs.css";

const TabsOrganisations = ({ organisations }) => {
  return (
    <container className="tabs">
      <input type="radio" id="tab-1-1" name="tab-group-1" checked />
      <label htmlFor="tab-1-1">Lietuvoje</label>
      <div>
        <CardList>
          {organisations.map((organisation, i) => {
            const logo = organisation.logo && (
              <GatsbyImage
                image={getImage(organisation.logo)}
                alt={organisation.title}
              />
            );
            if (`Lietuvoje` === organisation.location) {
              return (
                <Card title={organisation.title} logo={logo} key={i}>
                  {!!organisation.about && (
                    <CardSection title="Apie" content={organisation.about} />
                  )}
                  {!!organisation.cause && (
                    <CardSection
                      title="Paskirtis"
                      content={organisation.cause}
                    />
                  )}
                  {!!organisation.rekvizitai && (
                    <CardSection
                      title="Kita informacija"
                      content={organisation.rekvizitai}
                    />
                  )}

                  <div className={`Card__actions`}>
                    {!!organisation.support_link && (
                      <Button
                        icon={`arrow-white`}
                        href={organisation.support_link}
                        color={`primary`}
                        text={`Paremti`}
                        position={`right`}
                        target="_blank"
                      />
                    )}

                    {!!organisation.website && (
                      <Button
                        icon={`arrow-blue`}
                        href={organisation.website}
                        color={`transparent`}
                        text={`Oficialus puslapis`}
                        position={`right`}
                        target="_blank"
                      />
                    )}
                  </div>
                </Card>
              );
            }
          })}
        </CardList>
      </div>

      <input type="radio" id="tab-1-2" name="tab-group-1" />
      <label htmlFor="tab-1-2" tabIndex={`-1`}>
        Užsienyje
      </label>
      <div>
        <CardList>
          {organisations.map((organisation, i) => {
            const logo = organisation.logo && (
              <GatsbyImage
                image={getImage(organisation.logo)}
                alt={organisation.title}
              />
            );
            if (`Užsienyje` === organisation.location) {
              return (
                <Card title={organisation.title} logo={logo} key={i}>
                  {!!organisation.about && (
                    <CardSection title="Apie" content={organisation.about} />
                  )}
                  {!!organisation.cause && (
                    <CardSection
                      title="Paskirtis"
                      content={organisation.cause}
                    />
                  )}
                  {!!organisation.rekvizitai && (
                    <CardSection
                      title="Kita informacija"
                      content={organisation.rekvizitai}
                    />
                  )}

                  <div className={`Card__actions`}>
                    {!!organisation.support_link && (
                      <Button
                        icon={`arrow-white`}
                        href={organisation.support_link}
                        color={`primary`}
                        text={`Paremti`}
                        position={`right`}
                        target="_blank"
                      />
                    )}

                    {!!organisation.website && (
                      <Button
                        icon={`arrow-blue`}
                        href={organisation.website}
                        color={`transparent`}
                        text={`Oficialus puslapis`}
                        position={`right`}
                        target="_blank"
                      />
                    )}
                  </div>
                </Card>
              );
            }
          })}
        </CardList>
      </div>
    </container>
  );
};

TabsOrganisations.propTypes = {
  organisations: PropTypes.array,
};

export default TabsOrganisations;
