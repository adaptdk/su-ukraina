import { useLocation } from "@gatsbyjs/reach-router";

const isUkrainianPage = () => {
  const { pathname } = useLocation();
  return pathname.includes(`/ua/`);
};

const getLocaleFromPath = () => {
  const { pathname } = useLocation();

  if (pathname.includes(`/ua/`)) {
    return `uk-UA`;
  }

  if (pathname.includes(`/en/`)) {
    return `en`;
  }

  return `lt-LT`;
};

module.exports = {
  isUkrainianPage,
  getLocaleFromPath,
};
