import React from "react";

import EventCard from "./EventCard";

export default {
  component: EventCard,
  title: `Components/EventCard`,
};

const Template = (args) => {
  return <EventCard {...args}>{args.text}</EventCard>;
};
export const Primary = Template.bind({});
Primary.args = {
  title: `Kaunas už laisvę! (kovo 10-11 d.)`,
  type: `Palaikymo akcija`,
  organizer: `Kauno miesto savivaldybė`,
  location: `Kaunas`,
  startDate: `2022-03-10T16:00:00Z`,
  endDate: `2022-03-11T15:00:00Z`,
  eventUrl: `https://www.facebook.com/events/531861561580728/?acontext=%7B%22event_action_history%22%3A[%7B%22mechanism%22%3A%22your_upcoming_events_unit%22%2C%22surface%22%3A%22bookmark%22%7D]%2C%22ref_notif_type%22%3Anull%7D`,
};

Primary.parameters = {
  design: {
    type: `figma`,
    url: `https://www.figma.com/file/SbHEfVWgFSozSl1m5oJdmd/Suukraina.lt?node-id=1068%3A19658`,
  },
};
