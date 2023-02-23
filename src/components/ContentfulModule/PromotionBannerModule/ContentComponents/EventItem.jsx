import React from "react";
import { EventCardContent } from "../../EventsModule";
import Button from "../../../Button";
import { getTranslatedText } from "../../../../utils/getTranslatedText";
import { EventCardPropTypes } from "../../EventsModule/EventCard/EventCardPropTypes";

const EventItem = (props) => {
  return (
    <>
      <EventCardContent {...props} />
      <div className="Card__actions">
        <Button
          endIcon="arrow-blue"
          color="transparent"
          target="_blank"
          rel="noopener"
          href={props.eventUrl}
        >
          {getTranslatedText(`events.eventLink`)}
        </Button>
      </div>
    </>
  );
};

EventItem.propTypes = EventCardPropTypes;

export default EventItem;
