import React from "react";
import { HeadProvider } from "react-head";

import "@fontsource/roboto";
import "./src/styles/main.css";

export const wrapRootElement = ({ element }) => {
  return <HeadProvider>{element}</HeadProvider>;
};

export const onServiceWorkerUpdateReady = () => {
  window.location.reload();
};

export const shouldUpdateScroll = ({ routerProps: { location } }) => {
  const path = location.pathname.toLowerCase();
  if (
    path.includes(`pagalbos-paieska`) ||
    path.includes(`poshuk-posluh`) ||
    path.includes(`help-search`)
  ) {
    return false;
  }
  return true;
};
