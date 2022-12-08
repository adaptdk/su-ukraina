import React from "react";

import "./ResourceListModule.css";
import Button from "../../../Button";
import { ResourceListModulePropTypes } from "./ResourceListModulePropTypes";

const ResourceListModule = ({ heading, resources }) => {
  return (
    <section className="ResourceListModule">
      {!!heading && <h3 className="ResourceListModule__title">{heading}</h3>}
      <ul className="ResourceListModule__list">
        {resources?.at(0) &&
          resources.map(({ id, label, cta }) => {
            return (
              <li key={id} className="ResourceListItem">
                <div className="ResourceListItem__content">
                  <h4>{label}</h4>
                </div>
                <Button
                  endIcon={`arrow-blue`}
                  href={cta.url}
                  color={`transparent`}
                  target="_blank"
                >
                  {cta.label}
                </Button>
              </li>
            );
          })}
      </ul>
    </section>
  );
};

ResourceListModule.propTypes = ResourceListModulePropTypes;

export default ResourceListModule;
