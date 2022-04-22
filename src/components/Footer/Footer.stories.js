import React from "react";
import {
  createMemorySource,
  createHistory,
  LocationProvider,
} from "@gatsbyjs/reach-router";

import Footer from "./Footer";

let source = createMemorySource(`/starting/url`);
let history = createHistory(source);

export default {
  component: Footer,
  title: `Components/Footer`,
};

const Template = () => {
  return (
    <LocationProvider history={history}>
      <Footer />
    </LocationProvider>
  );
};

export const Primary = Template.bind({});

Primary.parameters = {
  design: {
    type: `figma`,
    url: `https://www.figma.com/file/SbHEfVWgFSozSl1m5oJdmd/Suukraina.lt?node-id=76%3A15003`,
  },
};
