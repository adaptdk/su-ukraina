import PropTypes from "prop-types";

const EventsModulePropTypes = {
  id: PropTypes.string.isRequired,
  internal: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      eventType: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      organizer: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      location: PropTypes.string,
      description: PropTypes.shape({
        raw: PropTypes.string,
      }),
      eventUrl: PropTypes.string,
    })
  ),
};

const EventsModuleDefaultProps = {
  events: [
    {
      organizer: ``,
      startDate: ``,
      endDate: ``,
      location: ``,
      description: {
        raw: ``,
      },
      eventUrl: ``,
    },
  ],
};

export { EventsModuleDefaultProps, EventsModulePropTypes };