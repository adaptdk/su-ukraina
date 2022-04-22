import React from "react";
import {
  createMemorySource,
  createHistory,
  LocationProvider,
} from "@gatsbyjs/reach-router";

import PromoLine from "./PromoLine";

let source = createMemorySource(`/starting/url`);
let history = createHistory(source);

export default {
  component: PromoLine,
  title: `Components/PromoLine`,
};

const Template = (args) => {
  return (
    <LocationProvider history={history}>
      <PromoLine
        title={args.title}
        subtitle={args.subtitle}
        titleLink="/"
        modifier={args.modifier}
      >
        {args.children}
      </PromoLine>
    </LocationProvider>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  title: `Вся важлива інформація для громадян України`,
  subtitle: `Svarbiausia informacija Ukrainos piliečiams`,
  modifier: `big`,
  children: `Some kind of content`,
};
