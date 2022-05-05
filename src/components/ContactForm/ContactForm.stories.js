import React from "react";
import {
  createMemorySource,
  createHistory,
  LocationProvider,
} from "@gatsbyjs/reach-router";

import ContactForm from "./ContactForm";

let source = createMemorySource(`/starting/url`);
let history = createHistory(source);

export default {
  component: ContactForm,
  title: `Components/ContactForm`,
};

const Template = () => {
  return (
    <LocationProvider history={history}>
      <ContactForm />
    </LocationProvider>
  );
};

export const Primary = Template.bind({});

Primary.parameters = {
  design: {
    type: `figma`,
    url: `https://www.figma.com/file/SbHEfVWgFSozSl1m5oJdmd/Suukraina.lt?node-id=76%3A14952`,
  },
};
