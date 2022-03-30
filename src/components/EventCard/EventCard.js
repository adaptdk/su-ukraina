import React from "react";
import PropTypes from "prop-types";

// Components.
import Button from "../../components/Button";

// Styles.
import "./EventCard.css";

const EventCard = ({
  title,
  type,
  organizer,
  location,
  startDate,
  endDate,
  description,
  url,
}) => {
  const getEventDate = (date) => {
    return `${new Date(date).toLocaleString(`lt`, {
      month: `long`,
    })} ${new Date(date).getDate()} d.`;
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
    <div className="EventCard">
      <div className="EventCard__content-container">
        {type && (
          <div className="EventCard__event-type-wrapper">
            <p className="EventCard__event-type">{type}</p>
          </div>
        )}
        {title && <p className="EventCard__event-title">{title}</p>}
        {organizer && <p className="EventCard__event-organizer">{organizer}</p>}
        {startDate && (
          <div className="EventCard__event-info-wrapper">
            <div className="EventCard__icon EventCard__icon--calendar" />
            <p className="EventCard__event-info-text">
              {getEventDate(startDate)}
              {endDate &&
                !datesAreOnSameDay(startDate, endDate) &&
                ` - ${getEventDate(endDate)}`}
            </p>
          </div>
        )}
        {startDate && (
          <div className="EventCard__event-info-wrapper">
            <div className="EventCard__icon EventCard__icon--clock" />
            <p className="EventCard__event-info-text">
              {getEventTime(startDate)}
              {endDate &&
                datesAreOnSameDay(startDate, endDate) &&
                ` - ${getEventTime(endDate)}`}
            </p>
          </div>
        )}
        {location && (
          <div className="EventCard__event-info-wrapper">
            <div className="EventCard__icon EventCard__icon--location" />
            <p className="EventCard__event-info-text">{location}</p>
          </div>
        )}
        {description && (
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className="EventCard__event-information"
          />
        )}
      </div>
      {url && (
        <Button icon="arrow-blue" color="transparent" href={url}>
          Renginio Nuoroda
        </Button>
      )}
    </div>
  );
};

EventCard.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  organizer: PropTypes.string,
  location: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  description: PropTypes.node,
  url: PropTypes.string,
};

export default EventCard;
