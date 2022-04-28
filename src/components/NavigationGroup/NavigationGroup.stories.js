import React from "react";

import NavigationGroup from "./NavigationGroup";

export default {
  component: NavigationGroup,
  title: `Components/NavigationGroup`,
};

const navigationGroup = [
  `patikima informacija`,
  `piliečio atmintinė`,
  `būkime budrūs`,
  `kaip galiu padėti?`,
];

const Template = () => {
  return <NavigationGroup additionalNav={navigationGroup} />;
};

export const Primary = Template.bind({});
