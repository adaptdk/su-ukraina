import React from "react";

import ContentfulModulePropTypes from "./ContentfulModulePropTypes";
import EventsModule from "./EventsModule";

const ContentfulModule = ({
  module,
  module: {
    internal: { type },
  },
}) => {
  if (type === `ContentfulEventsModule`) {
    return <EventsModule {...module} />;
  }

  return null;
};

ContentfulModule.propTypes = {
  module: ContentfulModulePropTypes.isRequired,
};

export default ContentfulModule;
