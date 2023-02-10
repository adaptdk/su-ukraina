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

  const filteredSortedEvents = events
    .filter((event) => {
      return event.title;
    })
    .sort((a, b) => {
      if (a.startDate > b.startDate) {
        return -1;
      }

      return 1;
    });
  const starredEvents = filteredSortedEvents.filter(({ starred }) => starred);
  const nonStarredEvents = filteredSortedEvents.filter(
    ({ starred }) => !starred
  );

  nonStarredEvents.forEach((event) => {
    const startDate = new Date(event.startDate);

    if (event.endDate) {
      const endDate = new Date(event.endDate);
      if (currentDate > endDate) {
        previousEvents.push(event);
      } else {
        upcomingEvents.unshift(event);
      }
    } else if (currentDate > startDate) {
      previousEvents.push(event);
    } else {
      upcomingEvents.unshift(event);
    }
  });

  starredEvents.forEach((event) => {
    const startDate = new Date(event.startDate);

    if (event.endDate) {
      const endDate = new Date(event.endDate);
      if (currentDate > endDate) {
        previousEvents.unshift(event);
      } else {
        upcomingEvents.unshift(event);
      }
    } else if (currentDate > startDate) {
      previousEvents.unshift(event);
    } else {
      upcomingEvents.unshift(event);
    }
  });

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
