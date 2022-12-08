import React from "react";

import { ResourceListModule } from "./ResourceListModule";
import { FaqItem } from "./FaqItem";
import { FaqModulePropTypes } from "./FaqModulePropTypes";

const FaqModule = ({ module, index }) => {
  const type = module?.internal?.type;

  if (type === `ContentfulFaqItem`) {
    return <FaqItem {...module} index={index} />;
  }

  if (type === `ContentfulResourceListModule`) {
    return <ResourceListModule {...module} />;
  }
};

FaqModule.propTypes = FaqModulePropTypes;

export default FaqModule;
