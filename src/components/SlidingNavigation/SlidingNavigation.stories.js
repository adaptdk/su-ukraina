import React from "react";

import SlidingNavigation from "./SlidingNavigation";

export default {
  component: SlidingNavigation,
  title: `Components/SlidingNavigation`,
};

const Template = (args) => {
  return <SlidingNavigation {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      title: `Asmenybės`,
      linkId: `people`,
      icon: `people`,
    },
    {
      title: `Institucijos`,
      linkId: `institutions`,
      icon: `institutions`,
    },
    {
      title: `Užsienio šaltiniai`,
      linkId: `foreign`,
      icon: `foreign`,
    },
  ],
  options: {
    threshold: 0.2,
  },
  isStorybook: true,
};

Default.parameters = {
  desing: {
    type: `figma`,
    url: `https://www.figma.com/file/SbHEfVWgFSozSl1m5oJdmd/Suukraina.lt?node-id=10%3A1921`,
  },
};
