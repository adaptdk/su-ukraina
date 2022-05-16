import React from "react";

import CtaCard from "./CtaCard";

export default {
  component: CtaCard,
  title: `Components/CtaCard`,
};

const Template = (args) => {
  return (
    <CtaCard title={args.title} iconHandle={args.iconHandle} link={args.link} />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  title: `Aukojimas`,
  link: `/kaip-galiu-padeti/aukojimas/`,
  iconHandle: `donate`,
};

Primary.parameters = {
  design: {
    type: `figma`,
    url: `https://www.figma.com/file/SbHEfVWgFSozSl1m5oJdmd/Suukraina.lt?node-id=351%3A10773`,
  },
};
