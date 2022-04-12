import React from "react";

import Card from "./Card";
import CardSection from "./CardSection";

export default {
  component: Card,
  title: `Components/Card`,
};

const Template = (args) => {
  return (
    <Card {...args}>
      <CardSection title="Paskirtis" content={args.cause} />
      <CardSection title="Apie" content={args.about} />
      <CardSection title="Kita informacija" content={args.rekvizitai} />
    </Card>
  );
};
export const Primary = Template.bind({});
Primary.args = {
  title: `Kaunas už laisvę! (kovo 10-11 d.)`,
  cause: `Paskirtis`,
  about: `Apie`,
  rekvizitai: `Rekvizitai`,
};
