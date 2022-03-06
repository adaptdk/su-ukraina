import * as React from "react";
import PropTypes from "prop-types";
import Button from "../Button";

import "./LinkCollection.css";

const LinkCollection = ({ title, children}) => {
  return (
    <section className="LinkCollection">

      {!!title &&
      <h2 className="LinkCollection__title">{title}</h2>
      }
      <ul class="LinkCollection__button-list">
        {children}
      </ul>
    </section>
  );
};

LinkCollection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};


export default LinkCollection;
