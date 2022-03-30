import * as React from "react";
import PropTypes from "prop-types";
import Button from "../Button";

const LinkCollectionItem = ({ to, text }) => {
  return (
    <li>
      <Button icon={`arrow-white`} to={to} color={`primary`} position={`right`}>
        {text}
      </Button>
    </li>
  );
};

LinkCollectionItem.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string,
};

export default LinkCollectionItem;
