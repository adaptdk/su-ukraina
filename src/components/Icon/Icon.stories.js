import React from "react";

import Icon from "./Icon";

const iconTypes = [
  `people`,
  `institutions`,
  `foreign`,
  `house`,
  `donate`,
  `volunteer`,
  `arrow-white`,
  `arrow-blue`,
  `edit`,
  `brain`,
  `briefcase`,
  `building-columns`,
  `bus-simple`,
  `child-reaching`,
  `coins`,
  `hands-holding-heart`,
  `key-skeleton`,
  `mobile-screen-button`,
  `parachute-box`,
  `paw`,
  `phone`,
  `suitcase-medical`,
  `user-police`,
];

const iconSizes = [`small`, `medium`, `large`];

export default {
  component: Icon,
  title: `Components/Icon`,
  argTypes: {
    type: { control: { type: `select`, options: iconTypes } },
    size: { control: { type: `select`, options: iconSizes } },
  },
};

const Template = (args) => {
  return <Icon {...args} />;
};

export const Small = Template.bind({});
Small.args = {
  type: `house`,
  size: `small`,
};

export const Medium = Template.bind({});
Medium.args = {
  ...Small.args,
  size: `medium`,
};

export const Large = Template.bind({});
Large.args = {
  ...Small.args,
  size: `large`,
};
