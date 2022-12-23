import { useLocation } from "@gatsbyjs/reach-router";

const isUkrainianPage = () => {
  const { pathname } = useLocation();
  return pathname.includes(`/ua/`);
};

const getLocaleFromPath = () => {
  const { pathname } = useLocation();

  if (pathname.includes(`/ua`)) {
    return `uk-UA`;
  }

  if (pathname.includes(`/en`)) {
    return `en`;
  }

  return `lt-LT`;
};

const getRichTextModuleData = (node, refs) => {
  const contentfulId = node.data.target.sys.id;
  const moduleData = refs.find((ref) => ref.contentful_id === contentfulId);

  return moduleData || null;
};

export { isUkrainianPage, getLocaleFromPath, getRichTextModuleData };
