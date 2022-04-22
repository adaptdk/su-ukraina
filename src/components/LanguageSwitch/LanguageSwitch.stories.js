import React from "react";
import {
  createMemorySource,
  createHistory,
  LocationProvider,
} from "@gatsbyjs/reach-router";

import LanguageSwitch from "./LanguageSwitch";

let source = createMemorySource(`/starting/url`);
let history = createHistory(source);

export default {
  component: LanguageSwitch,
  title: `Components/LanguageSwitch`,
};

const Template = () => {
  return (
    <LocationProvider history={history}>
      <LanguageSwitch />
    </LocationProvider>
  );
};

export const Primary = Template.bind({});
