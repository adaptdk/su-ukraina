import * as React from "react";
import PropTypes from "prop-types";
import Linkify from "react-linkify";

const CardSection = ({ content, title }) => {
  return (
    <div className="CardSection">
      {!!title && <h3 className="CardSection__title">{title}</h3>}
      <div className="CardSection__content">
        <Linkify>{content}</Linkify>
      </div>
    </div>
  );
};

CardSection.propTypes = {
  title: PropTypes.node,
  content: PropTypes.node,
};

export default CardSection;
