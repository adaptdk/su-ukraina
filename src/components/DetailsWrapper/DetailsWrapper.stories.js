import React from "react";

import DetailsWrapper from "./DetailsWrapper";

export default {
  component: DetailsWrapper,
  title: `Components/DetailsWrapper`,
};

const Template = (args) => {
  return <DetailsWrapper tag={args.tag} summary={args.summary} />;
};

export const Primary = Template.bind({});
Primary.args = {
  tag: `h2`,
  summary: `Praėję renginiai`,
};

Primary.parameters = {
  design: {
    type: `figma`,
    url: `https://www.figma.com/file/SbHEfVWgFSozSl1m5oJdmd/Suukraina.lt?node-id=1068%3A19665`,
  },
};
