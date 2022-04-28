export const modifyCrumbs = (crumbs, modifier) => {
  const modifiedCrumbs = crumbs.map((crumb, index) => {
    if (index === crumbs.length - 1) {
      return {
        pathname: crumb.pathname,
        crumbLabel: modifier,
      };
    }
    return crumb;
  });

  return modifiedCrumbs;
};
