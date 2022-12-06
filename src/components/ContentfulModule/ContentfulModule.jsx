import React from "react";

import ContentfulModulePropTypes from "./ContentfulModulePropTypes";
import EventsModule from "./EventsModule";
import ChipModule from "./ChipModule";
import { SlidingNavBlock } from "../SlidingNavBlock";

const ContentfulModule = ({
  module,
  module: {
    internal: { type },
  },
}) => {
  if (type === `ContentfulEventsModule`) {
    return <EventsModule {...module} />;
  }

  if (type === `ContentfulSlidingNavBlock`) {
    return <SlidingNavBlock />;
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
