import React from "react";

import HeroBanner from "./HeroBanner";

export default {
  component: HeroBanner,
  title: `Components/HeroBanner`,
};

const Template = (args) => {
  return (
    <HeroBanner title={args.title} subtitle={args.subtitle}>
      {args.children}
    </HeroBanner>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  title: `Su Ukraina iki pergalės!`,
  subtitle: `Subtitle`,
  children: `Content`,
};
