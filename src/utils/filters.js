/**
 * Filters out items that don't have a label, logo or url.
 *
 * This method is necessary, because if the partner has no translations,
 * all the properties come as null, except for `id` and then when we map this
 * we render empty headings without any partner logos etc.
 *
 * @param {Array} array Partners array.
 * @returns {Array} Filtered out partners array.
 */
const filterPartners = (array) => {
  return array.filter((item) => {
    return item.label && item.logo && item.url;
  });
};

module.exports = {
  filterPartners,
};
