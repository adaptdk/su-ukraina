import React from "react";
import classNames from "classnames";

// Components.
import Button from "../../../Button";

// Styles.
import "./EventCard.css";
import { getTranslatedText } from "../../../../utils/getTranslatedText";
import { EventCardPropTypes } from "./EventCardPropTypes";
import EventCardContent from "./EventCardContent";
import Icon from "../../../Icon";

const EventCard = (props) => {
  const { className, eventUrl, starred } = props;

  return (
    <div className={classNames(`EventCard`, className)}>
      <EventCardContent {...props} />
      {eventUrl && (
        <Button
          endIcon="arrow-blue"
          color="transparent"
          target="_blank"
          rel="noopener"
          href={eventUrl}
        >
          {getTranslatedText(`events.eventLink`)}
        </Button>
      )}
      {starred && <Icon className="EventCard__star" type="star-bookmark" />}
    </div>
  );
};

EventCard.propTypes = EventCardPropTypes;

export default EventCard;
