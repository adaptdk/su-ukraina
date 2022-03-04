import React from "react";
import { HeadProvider } from "react-head";

import "./src/styles/main.css";

export const wrapRootElement = ({ element }) => {
  return <HeadProvider>{element}</HeadProvider>;
};
