import React from "react";
import PropTypes from "prop-types";

// Components.
import Button from "../../../Button";
import Icon from "../../../Icon";

import { formatRichText } from "../../../../helpers/formatting";
import { localePropType } from "../../../../helpers/genericPropTypes";

// Styles.
import "./EventCard.css";
import { getTranslatedText } from "../../../../utils/getTranslatedText";

const EventCard = ({
  className = ``,
  title,
  eventType,
  organizer,
  location,
  startDate,
  endDate,
  description,
  eventUrl,
  locale,
}) => {
  const getEventDate = (date, locale) => {
    return `${new Date(date).toLocaleString(locale, {
      month: `long`,
    })} ${new Date(date).getDate()} ${locale === `uk-UA` ? `д.` : `d.`}`;
  };
  const getEventTime = (date) => {
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();

    return `${hours >= 10 ? hours : `0` + hours}:${
      minutes >= 10 ? minutes : `0` + minutes
    }`;
  };

  const datesAreOnSameDay = (first, second) => {
    const firstDate = new Date(first);
    const secondDate = new Date(second);

    return (
      firstDate.getFullYear() === secondDate.getFullYear() &&
      firstDate.getMonth() === secondDate.getMonth() &&
      firstDate.getDate() === secondDate.getDate()
    );
  };

  return (
    <div className={`EventCard ${className}`}>
      <div className="EventCard__content-container">
        {eventType && (
          <div className="EventCard__event-type-wrapper">
            <p className="EventCard__event-type">{eventType}</p>
          </div>
        )}
        {title && <p className="EventCard__event-title">{title}</p>}
        {organizer && <p className="EventCard__event-organizer">{organizer}</p>}
        {startDate && (
          <div className="EventCard__event-info-wrapper">
            <Icon type="calendar" />
            <time className="EventCard__event-info-text" dateTime={startDate}>
              {getEventDate(startDate, locale)}
              {endDate &&
                !datesAreOnSameDay(startDate, endDate) &&
                ` - ${getEventDate(endDate, locale)}`}
            </time>
          </div>
        )}
        {startDate && (
          <div className="EventCard__event-info-wrapper">
            <Icon type="clock" />
            <time className="EventCard__event-info-text" dateTime={startDate}>
              {getEventTime(startDate)}
              {endDate &&
                datesAreOnSameDay(startDate, endDate) &&
                ` - ${getEventTime(endDate)}`}
            </time>
          </div>
        )}
        {location && (
          <div className="EventCard__event-info-wrapper">
            <Icon type="location" />
            <p className="EventCard__event-info-text">{location}</p>
          </div>
        )}
        {description?.raw && formatRichText(description.raw)}
      </div>
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
    </div>
  );
};

EventCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  eventType: PropTypes.string,
  organizer: PropTypes.string,
  location: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  description: PropTypes.node,
  eventUrl: PropTypes.string,
  locale: localePropType.isRequired,
};

export default EventCard;
