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

Primary.parameters = {
  design: {
    type: `figma`,
    url: `https://www.figma.com/file/SbHEfVWgFSozSl1m5oJdmd/Suukraina.lt?node-id=351%3A102080`,
  },
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: `Secondary`,
  color: `secondary`,
  disabled: false,
};

Secondary.parameters = {
  design: {
    type: `figma`,
    url: `https://www.figma.com/file/SbHEfVWgFSozSl1m5oJdmd/Suukraina.lt?node-id=351%3A102052`,
  },
};

export const Transparent = Template.bind({});
Transparent.args = {
  text: `Transparent`,
  color: `transparent`,
  disabled: false,
};

Transparent.parameters = {
  design: {
    type: `figma`,
    url: `https://www.figma.com/file/SbHEfVWgFSozSl1m5oJdmd/Suukraina.lt?node-id=351%3A102088`,
  },
};
