import React from "react";

import ContentfulModulePropTypes from "./ContentfulModulePropTypes";
import EventsModule from "./EventsModule";
import ChipModule from "./ChipModule/ChipModule";
import { SlidingNavBlock } from "./SlidingNavBlock";

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

  return null;
};

ContentfulModule.propTypes = {
  module: ContentfulModulePropTypes.isRequired,
};

export default ContentfulModule;
