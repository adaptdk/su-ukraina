import React from "react";

import Button from "../../../Button";
import {
  LinkCollectionModuleDefaultProps,
  LinkCollectionModulePropTypes,
} from "../LinkCollectionModulePropTypes";

import "./LcmDefault.css";

const LcmDefault = ({ heading, links }) => {
  return (
    <section className="LcmDefault">
      {!!heading && <h2 className="LcmDefault__title">{heading}</h2>}
      <ul className="LcmDefault__button-list">
        {links.map((link) => {
          return (
            <li key={link.id}>
              <Button endIcon={`arrow-white`} to={link.url} color={`primary`}>
                {link.label}
              </Button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

LcmDefault.propTypes = LinkCollectionModulePropTypes;

LcmDefault.defaultProps = LinkCollectionModuleDefaultProps;

export default LcmDefault;
