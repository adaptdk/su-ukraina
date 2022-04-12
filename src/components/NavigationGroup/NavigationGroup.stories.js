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

const crumbs = [`Potesto formos`, `Renginiai`];

const Template = () => {
  return <NavigationGroup additionalNav={navigationGroup} crumbs={crumbs} />;
};
export const Primary = Template.bind({});
