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
