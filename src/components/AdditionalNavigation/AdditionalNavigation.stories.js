import React from "react";

import AdditionalNavigation from "./AdditionalNavigation";

export default {
  component: AdditionalNavigation,
  title: `Components/AdditionalNavigation`,
};

const additionalNavigation = [
  `patikima informacija`,
  `piliečio atmintinė`,
  `būkime budrūs`,
  `kaip galiu padėti?`,
];

const Template = () => {
  return (
    <AdditionalNavigation additionalNav={additionalNavigation}>
      {}
    </AdditionalNavigation>
  );
};
export const Primary = Template.bind({});
