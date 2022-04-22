import React from "react";
import {
  createMemorySource,
  createHistory,
  LocationProvider,
} from "@gatsbyjs/reach-router";

import Header from "./Header";

let source = createMemorySource(`/starting/url`);
let history = createHistory(source);

export default {
  component: Header,
  title: `Components/Header`,
};

const Template = () => {
  return (
    <LocationProvider history={history}>
      <Header />
    </LocationProvider>
  );
};

export const Primary = Template.bind({});

Primary.parameters = {
  design: {
    type: `figma`,
    url: `https://www.figma.com/file/SbHEfVWgFSozSl1m5oJdmd/Suukraina.lt?node-id=76%3A15083`,
  },
};
