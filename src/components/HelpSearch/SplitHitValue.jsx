import React from "react";
import PropTypes from "prop-types";
import Linkify from "react-linkify";

import { splitHitValueByNewlines } from "./utils";

const SplitHitValue = ({ children }) => {
  return (
    <>
      {splitHitValueByNewlines(children).map((str, i) => {
        return (
          <p key={i}>
            <Linkify>{str}</Linkify>
          </p>
        );
      })}
    </>
  );
};

SplitHitValue.propTypes = {
  children: PropTypes.string,
};

export default SplitHitValue;
