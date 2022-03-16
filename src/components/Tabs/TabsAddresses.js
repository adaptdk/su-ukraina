import * as React from "react";
import PropTypes from "prop-types";

import Button from "../../components/Button";
import CardSection from "../../components/Card/CardSection";
import Card from "../../components/Card";
import CardList from "../../components/CardList";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import "./Tabs.css";

const TabsAddressees = ({ addressees }) => {
  return (
    <container className="tabs">
      <input type="radio" id="tab-1-1" name="tab-group-1" checked />
      <label htmlFor="tab-1-1">Ambasada</label>
      <div>
        <CardList>
          {addressees.map((addressee, i) => {
            if (`ambasada` === addressee.type[0]) {
              return (
                <Card title={addressee.title} key={i}>
                  <div className="Card__type">
                    <ul>
                      {addressee.type.map((singleType, j) => {
                        return <li key={j}>{singleType}</li>;
                      })}
                    </ul>
                  </div>

                  {!!addressee.purpose && (
                    <CardSection
                      title="Kreipimosi klausimas"
                      content={addressee.purpose}
                    />
                  )}
                  {!!addressee.emailOrLink && (
                    <CardSection
                      title="Skaitmeninis kanalas"
                      content={addressee.emailOrLink}
                    />
                  )}
                  {!!addressee.address && (
                    <CardSection title="Adresas" content={addressee.address} />
                  )}

                  <div className={`Card__actions`}>
                    {!!addressee.emailOrLink && (
                      <Button
                        icon={`arrow-blue`}
                        href={`mailto:${addressee.emailOrLink}`}
                        color={`transparent`}
                        text={`Rašyti laišką`}
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
        Įmonė
      </label>
      <div>
        <CardList>
          {addressees.map((addressee, i) => {
            if (`įmonė` === addressee.type[0]) {
              return (
                <Card title={addressee.title} key={i}>
                  <div className="Card__type">
                    <ul>
                      {addressee.type.map((singleType, j) => {
                        return <li key={j}>{singleType}</li>;
                      })}
                    </ul>
                  </div>

                  {!!addressee.purpose && (
                    <CardSection
                      title="Kreipimosi klausimas"
                      content={addressee.purpose}
                    />
                  )}
                  {!!addressee.emailOrLink && (
                    <CardSection
                      title="Skaitmeninis kanalas"
                      content={addressee.emailOrLink}
                    />
                  )}
                  {!!addressee.address && (
                    <CardSection title="Adresas" content={addressee.address} />
                  )}

                  <div className={`Card__actions`}>
                    {!!addressee.emailOrLink && (
                      <Button
                        icon={`arrow-blue`}
                        href={`mailto:${addressee.emailOrLink}`}
                        color={`transparent`}
                        text={`Rašyti laišką`}
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

TabsAddressees.propTypes = {
  addressees: PropTypes.array,
};

export default TabsAddressees;
