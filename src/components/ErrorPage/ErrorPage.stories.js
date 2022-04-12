import React from "react";

import ErrorPage from "./ErrorPage";

export default {
  component: ErrorPage,
  title: `Components/ErrorPage`,
};

const Template = (args) => {
  return <ErrorPage>{args.content}</ErrorPage>;
};

export const Primary = Template.bind({});
Primary.args = {
  content: `Ooops! An error encountered. Please try again later`,
};

Primary.parameters = {
  design: {
    type: `figma`,
    url: `https://www.figma.com/file/SbHEfVWgFSozSl1m5oJdmd/Suukraina.lt?node-id=1132%3A21985`,
  },
};
