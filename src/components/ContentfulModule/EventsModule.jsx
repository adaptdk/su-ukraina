import React from "react";
import { EventsModulePropTypes } from "./EventsModulePropTypes";
import EventCardList from "../EventCardList";
import EventCard from "../EventCard";
import DetailsWrapper from "../DetailsWrapper";

const EventsModule = ({ events }) => {
  const currentDate = new Date();
  const upcomingEvents = [];
  const previousEvents = [];

  events.forEach((event) => {
    const startDate = new Date(event.startDate);

    if (event.endDate) {
      const endDate = new Date(event.endDate);
      if (currentDate > endDate) {
        previousEvents.unshift(event);
      } else {
        upcomingEvents.push(event);
      }
    } else if (currentDate > startDate) {
      previousEvents.unshift(event);
    } else {
      upcomingEvents.push(event);
    }
  });

  return (
    <div className="EventsModule">
      {/* @todo: translate this */}
      <h2>Organizuojami renginiai</h2>
      <EventCardList>
        {upcomingEvents.length ? (
          upcomingEvents.map((event, i) => {
            return (
              <EventCard
                key={i}
                type={event.eventType}
                title={event.title}
                organizer={event.eventOrganizer}
                startDate={event.startDate}
                endDate={event.endDate}
                location={event.location}
                description={event.description}
                url={event.eventUrl}
              />
            );
          })
        ) : (
          // @todo: translate this
          <p>Numatomų renginių kol kas nėra.</p>
        )}
      </EventCardList>

      {!!previousEvents.length && (
        <DetailsWrapper tag="h2" summary="Praėję renginiai">
          <EventCardList>
            {previousEvents.map((event, i) => {
              console.log(`event: `, event);
              return (
                <EventCard
                  key={i}
                  className="EventCard--previous"
                  type={event.eventType}
                  title={event.title}
                  organizer={event.eventOrganizer}
                  startDate={event.startDate}
                  endDate={event.endDate}
                  location={event.location}
                  description={event.html}
                  url={event.eventUrl}
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
