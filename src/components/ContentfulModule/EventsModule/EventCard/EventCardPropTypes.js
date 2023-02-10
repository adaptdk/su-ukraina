import PropTypes from "prop-types";
import { localePropType } from "../../../../helpers/genericPropTypes";

const EventCardPropTypes = {
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

export { EventCardPropTypes };
