import React from "react";
import PropTypes from "prop-types";
import { Title } from "react-head";

const PageTitle = ({ title }) => {
  if (title.includes(`🇺🇦 Suukraina.lt`)) {
    return <Title>{title}</Title>;
  }

  return <Title>{title} 🇺🇦 Suukraina.lt</Title>;
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
