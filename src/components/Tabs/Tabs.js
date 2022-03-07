import * as React from "react";
import PropTypes from "prop-types";

import "./Tabs.css";

const Tabs = ({ handleTab, tabState, firstOption, secondOption }) => {
  return (
    <container className="tabs">
      <section
        className={`tabs__section${tabState === 1 ? `--active` : ``}`}
        onClick={() => {
          return handleTab(1);
        }}
      >
        <p className="tabs__name">{firstOption}</p>
      </section>
      <section
        className={`tabs__section${tabState === 2 ? `--active` : ``}`}
        onClick={() => {
          return handleTab(2);
        }}
      >
        <p className="tabs__name">{secondOption}</p>
      </section>
    </container>
  );
};

Tabs.propTypes = {
  handleTab: PropTypes.func,
  tabState: PropTypes.number,
  firstOption: PropTypes.string,
  secondOption: PropTypes.string,
};

export default Tabs;
