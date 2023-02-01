import React from "react";

import PartnerList from "./PartnerList";
import Partner from "./Partner";
import {
  PartnersModuleDefaultProps,
  PartnersModulePropTypes,
} from "./PartnersModulePropTypes";

import "./PartnersModule.css";

const PartnersModule = ({ heading, partnerCollections }) => {
  return (
    <div className="PartnersModule">
      <h2 className="PartnersModule__title">{heading}</h2>

      <div className="PartnersModule__category-wrapper">
        {partnerCollections.map((collection) => {
          if (!collection?.partners?.at(0)) {
            return null;
          }
          return (
            <div key={collection.id} className="PartnersModule__category">
              <h3 className="PartnersModule__category-title">
                {collection.category}
              </h3>
              <PartnerList>
                {collection.partners.map((partner) => {
                  return <Partner key={partner.id} {...partner} />;
                })}
              </PartnerList>
            </div>
          );
        })}
      </div>
    </div>
  );
};

PartnersModule.propTypes = PartnersModulePropTypes;

PartnersModule.defaultProps = PartnersModuleDefaultProps;

export default PartnersModule;
