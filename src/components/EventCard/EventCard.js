import React from 'react';
import PropTypes from "prop-types";

// Components.
import Button from '../../components/Button';

// Styles.
import './EventCard.css';

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
  const eventDate = `${new Date(startDate).toLocaleString('lt', { month: 'long' })} ${new Date(startDate).getDay()} d.`;
  const getEventTime = (date) => {
    const val = `${new Date(date).getUTCHours()}:${new Date(date).getUTCMinutes()}`;
    return val;
  };

  return (
    <div className="EventCard">
      <div className="EventCard__content-container">
        {type && 
          <div className="EventCard__event-type-wrapper">
            <p className="EventCard__event-type">
              {type}
            </p>
          </div>
        }
        {title && 
          <p className="EventCard__event-title">
            {title}
          </p>
        }
        {organizer &&
          <p className="EventCard__event-organizer">
            {organizer}
          </p>
        }
        {eventDate && 
          <div className="EventCard__event-info-wrapper">
            <div className="EventCard__icon EventCard__icon--calendar"/>
            <p className="EventCard__event-info-text">
              {eventDate}
            </p>
          </div>
        }
        {startDate && 
          <div className="EventCard__event-info-wrapper">
            <div className="EventCard__icon EventCard__icon--clock"/>
            <p className="EventCard__event-info-text">
              {getEventTime(startDate)} - {getEventTime(endDate)}
            </p>
          </div>
        }
        {location && 
          <div className="EventCard__event-info-wrapper">
            <div className="EventCard__icon EventCard__icon--location"/>
            <p className="EventCard__event-info-text">
              {location}
            </p>
          </div>
        }
        {description && 
          <div dangerouslySetInnerHTML={{ __html: description }} className="EventCard__event-information"/>
        }
      </div>
      {url && <Button icon="arrow-blue" color="transparent" href={url} text="Renginio Nuoroda"/>}
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
}

export default EventCard;