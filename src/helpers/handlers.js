import { useLocation } from "@gatsbyjs/reach-router";

export const isUkrainianPage = () => {
  const { pathname } = useLocation();
  return pathname.includes(`/ua/`);
};
