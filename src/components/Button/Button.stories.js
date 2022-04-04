import React from "react";

import Button from "./Button";

export default {
  component: Button,
  title: `Components/Button`,
};

const Template = (args) => {
  return <Button {...args}>{args.text}</Button>;
};

export const Primary = Template.bind({});
Primary.args = {
  text: `Primary`,
  color: `primary`,
  disabled: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: `Secondary`,
  color: `secondary`,
  disabled: false,
};

export const Transparent = Template.bind({});
Transparent.args = {
  text: `Transparent`,
  color: `transparent`,
  disabled: false,
};
