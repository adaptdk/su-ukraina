import React from "react";

import Button from "../../Button";
import { getTranslatedText } from "../../../utils/getTranslatedText";
import { ResourceItemPropTypes } from "./ResourceListModulePropTypes";

const ResourceItem = ({ label, subtext, sourceUrl }) => {
  return (
    <div className="ResourceListItem">
      <div className="ResourceListItem__content">
        <h3>{label}</h3>
        {!!subtext && <p>{subtext}</p>}
      </div>
      <Button
        endIcon={`arrow-blue`}
        href={sourceUrl}
        color={`transparent`}
        target="_blank"
      >
        {getTranslatedText(`labels.source`)}
      </Button>
    </div>
  );
};

ResourceItem.propTypes = ResourceItemPropTypes;

export default ResourceItem;
