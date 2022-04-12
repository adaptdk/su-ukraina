import React from "react";

import Breadcrumb from "./Breadcrumb";

export default {
  component: Breadcrumb,
  title: `Components/Breadcrumb`,
};

const crumbs = [`Potesto formos`, `Renginiai`];

const Template = () => {
  return <Breadcrumb crumbs={crumbs} />;
};

export const Primary = Template.bind({});
