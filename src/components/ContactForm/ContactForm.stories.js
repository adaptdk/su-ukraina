import React from "react";

import ContactForm from "./ContactForm";

export default {
  component: ContactForm,
  title: `Components/ContactForm`,
};

const Template = () => {
  return <ContactForm />;
};

export const Primary = Template.bind({});

Primary.parameters = {
  design: {
    type: `figma`,
    url: `https://www.figma.com/file/SbHEfVWgFSozSl1m5oJdmd/Suukraina.lt?node-id=76%3A14952`,
  },
};
