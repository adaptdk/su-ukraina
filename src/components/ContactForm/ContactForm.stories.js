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
