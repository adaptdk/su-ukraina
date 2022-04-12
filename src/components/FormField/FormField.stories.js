import React from "react";

import FormField from "./FormField";

export default {
  component: FormField,
  title: `Components/FormField`,
};

const Template = (args) => {
  return (
    <FormField type={args.type} label={args.label} labelFor={args.labelFor}>
      Input Component
    </FormField>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  type: `text`,
  label: `label`,
  labelFor: `label`,
};
