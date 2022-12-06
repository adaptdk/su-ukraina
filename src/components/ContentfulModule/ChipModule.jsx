import React from "react";
import ContactChip from "../ContactChip";
import { ChipModulePropTypes } from "./ChipModulePropTypes";

const ChipModule = ({ chips }) => {
  return (
    <div className="ChipModule">
      {chips?.at(0) &&
        chips.map((chip) => {
          return (
            <ContactChip
              key={chip.id}
              heading={chip.heading}
              subheading={chip.subheading}
              links={chip.links}
            />
          );
        })}
    </div>
  );
};

ChipModule.propTypes = ChipModulePropTypes;

export default ChipModule;
