import React from "react";

import ResourceList from "./ResourceList";
import ResourceListItem from "./ResourceListItem";

export default {
  component: ResourceList,
  title: `Components/ResourceList`,
};

const Template = (args) => {
  return (
    <ResourceList title={args.title}>
      <ResourceListItem
        title={args.content.title}
        subtitle={args.content.subtitle}
        url={args.content.link}
        buttonText={args.content.buttonText}
      />
    </ResourceList>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  title: `ResourceList component title`,
  content: {
    title: `Lietuvos policijos parengtas gidas`,
    subtitle: `Subtitle`,
    link: `https://policija.lrv.lt/lt/duk/sukciavimo-budai`,
    buttonText: `Šaltinis`,
  },
};
