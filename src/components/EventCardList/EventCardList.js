import React from 'react';
import PropTypes from "prop-types";

import './EventCardList.css';

const EventCardList = ({ children }) => {
  return (
    <div className="EventCardList">
      {children}
    </div>
  );
};

EventCardList.propTypes = {
  children: PropTypes.node,
};

export default EventCardList;