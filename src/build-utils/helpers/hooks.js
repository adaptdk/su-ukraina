const getSlidingNavData = (modules) => {
  const filteredModules = modules.filter((module) => {
    return module.internal.type === `ContentfulSlidingNavBlock`;
  });
  if (filteredModules?.at(0)) {
    return filteredModules.map((module) => {
      return { ...module, linkId: module.id };
    });
  }
  return null;
};

module.exports = {
  getSlidingNavData,
};
