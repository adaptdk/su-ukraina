import React from "react";

import ContentfulModulePropTypes from "./ContentfulModulePropTypes";
import { EventsModule } from "./EventsModule";
import { ChipModule } from "./ChipModule";
import { SlidingNavBlock } from "./SlidingNavBlock";
import { ResourceListModule, ResourceItem } from "./ResourceListModule";
import { ContentfulAsset } from "./ContentfulAsset";

const ContentfulModule = ({ module }) => {
  const type = module?.internal?.type || ``;

  if (type === `ContentfulEventsModule`) {
    return <EventsModule {...module} />;
  }

  if (type === `ContentfulSlidingNavBlock`) {
    return <SlidingNavBlock {...module} />;
  }

  if (type === `ContentfulChipModule`) {
    return <ChipModule {...module} />;
  }

  if (type === `ContentfulResourceListModule`) {
    return <ResourceListModule {...module} />;
  }

  if (type === `ContentfulResourceItem`) {
    return <ResourceItem {...module} />;
  }

  if (type === `ContentfulAsset`) {
    return <ContentfulAsset {...module} />;
  }

  return null;
};

ContentfulModule.propTypes = {
  module: ContentfulModulePropTypes.isRequired,
};

export default ContentfulModule;
