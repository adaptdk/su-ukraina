import React from "react";

import ContactChip from "./ContactChip";

export default {
  component: ContactChip,
  title: `Components/ContactChip`,
};

const Template = (args) => {
  return (
    <ContactChip
      description={args.description}
      url={args.url}
      facebookUrl={args.facebook}
      twitterUrl={args.twitter}
    >
      {args.title}
    </ContactChip>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  title: `Volodimiras Zelenskis`,
  description: `Ukrainos prezidentas`,
  url: `https://twitter.com/ZelenskyyUa`,
  facebook: `https://twitter.com/ZelenskyyUa`,
  twitter: `https://twitter.com/ZelenskyyUa`,
  weight: -2000,
};
