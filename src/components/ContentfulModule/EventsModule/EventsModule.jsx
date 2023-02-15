import React from "react";
import { EventsModulePropTypes } from "./EventsModulePropTypes";
import EventCardList from "./EventCardList";
import EventCard from "./EventCard";
import DetailsWrapper from "../../DetailsWrapper";
import { getTranslatedText } from "../../../utils/getTranslatedText";

const EventsModule = ({ events, locale }) => {
  const currentDate = new Date();
  const upcomingEvents = [];
  const previousEvents = [];

  const sortedEvents = events.sort((a, b) =>
    a.startDate > b.startDate ? -1 : 1
  );
  const starredEvents = sortedEvents.filter(
    ({ starred, title }) => starred && title
  );
  const nonStarredEvents = sortedEvents.filter(
    ({ starred, title }) => !starred && title
  );

  const categorizeEvent = (event) => {
    const startDate = new Date(event.startDate);
    const endDate = event.endDate ? new Date(event.endDate) : null;

    if (endDate ? currentDate > endDate : currentDate > startDate) {
      previousEvents.unshift(event);
    } else {
      upcomingEvents.unshift(event);
    }
  };

  nonStarredEvents.forEach(categorizeEvent);
  starredEvents.forEach(categorizeEvent);

  return (
    <div className="EventsModule">
      <h2>{getTranslatedText(`events.upcomingEvents`)}</h2>
      <EventCardList>
        {upcomingEvents.length ? (
          upcomingEvents.map((event, i) => {
            return <EventCard key={i} {...event} locale={locale} />;
          })
        ) : (
          <p>{getTranslatedText(`events.noEvents`)}</p>
        )}
      </EventCardList>

      {!!previousEvents.length && (
        <DetailsWrapper
          tag="h2"
          summary={getTranslatedText(`events.previousEvents`)}
        >
          <EventCardList>
            {previousEvents.map((event, i) => {
              return (
                <EventCard
                  key={i}
                  className="EventCard--previous"
                  {...event}
                  locale={locale}
                />
              );
            })}
          </EventCardList>
        </DetailsWrapper>
      )}
    </div>
  );
};

EventsModule.propTypes = EventsModulePropTypes;

export default EventsModule;
