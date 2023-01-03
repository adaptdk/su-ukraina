import React from "react";

import { LinkCollectionModulePropTypes } from "./LinkCollectionModulePropTypes";
import Button from "../../Button";

import "./LinkCollectionModule.css";

const LinkCollectionModule = ({ title, links }) => {
  return (
    <section className="LinkCollectionModule">
      {!!title && <h2 className="LinkCollectionModule__title">{title}</h2>}
      <ul className="LinkCollectionModule__button-list">
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

LinkCollectionModule.propTypes = LinkCollectionModulePropTypes;

LinkCollectionModule.defaultProps = {
  title: ``,
};

export default LinkCollectionModule;
