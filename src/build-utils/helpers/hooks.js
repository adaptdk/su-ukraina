const slugify = require(`slugify`);

/**
 * Finds all the SlidingNavBlocks in your modules array and injects them with the `linkId`.
 *
 * @param {Array} modules All of the modules on your single page. Make sure it has the internal type queried.
 * @returns {Array} Array of modules with an additional `linkid`.
 */
const getSlidingNavData = (modules) => {
  if (!modules) {
    return null;
  }

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

/**
 * Builds path from slug and locale.
 *
 * An optional `prefix` string can be passed in to get path that are nested.
 * For example passing in a `page` slug, `uk-UA` locale and a `help` prefix
 * would return `"ua/help/page"`.
 * @param {String} locale Locale queried from GraphQL, eg: `"lt-LT"`.
 * @param {String} slug Slug queried from GraphQL without trailing slashes.
 * @param {lt: String, ua: String} prefix Optional prefix object for generating page/subpage. No trailing slashes
 * @returns Returns full `path`, eg: `"ua/privacy-policy"`
 */
const getPathByLocale = (locale, slug, prefix = { lt: ``, ua: ``, en: `` }) => {
  if (locale === `lt-LT`) {
    if (prefix?.lt) {
      return `${prefix.lt}/${slug}`;
    }
    return slug;
  }

  if (locale === `uk-UA`) {
    if (prefix?.ua) {
      return `ua/${prefix.ua}/${slug}`;
    }
    return `ua/${slug}`;
  }

  if (locale === `en`) {
    if (prefix?.en) {
      return `en/${prefix.en}/${slug}`;
    }
    return `en/${slug}`;
  }

  // This will break the build and we want that
  return null;
};

const getHomePagePath = (locale) => {
  if (locale === `lt-LT`) {
    return `/`;
  }

  if (locale === `uk-UA`) {
    return `ua`;
  }

  if (locale === `en`) {
    return `en`;
  }

  // This will break the build and we want that
  return null;
};

/**
 * @param {String} name Name of the organisation.
 * @param {String} locale Queried locale, `lt-LT` or `uk-UA`.
 * @param {String} type Organisation type, either `Volunteering` or `Donation`. Defaults to `Donation`.
 * @returns {String} Full path, eg.: `ua/organisation/blueyellow`.
 */
const getOrganisationPagePath = (name, locale, type = `Donation`) => {
  if (!name) {
    return null;
  }

  const slug =
    slugify(name, {
      lower: true,
      strip: true,
      remove: /[*+~.()/'"!:@]/g,
    }) || null;

  const ltPrefix = type === `Donation` ? `aukojimas` : `savanoryste`;

  return getPathByLocale(locale, slug, {
    lt: `kaip-galiu-padeti/${ltPrefix}`,
    ua: `dopomogti`,
    en: `help`,
  });
};

/**
 * Get all of the pages' localised slugs. Used for the LanguageSwitch.
 *
 * @param {Array} pages All pages queried from Contentful.
 * @returns {Object} Object where each item's key is the `contentful_id` and the value is an object of slugs by locale.
 */
const getAllPagesLocalisedSlugs = (pages) => {
  return pages.reduce((acc, curr) => {
    const id = curr.contentful_id;
    const locale = curr.node_locale;
    const slug = curr.slug;

    if (locale === `uk-UA`) {
      return { ...acc, [id]: { ...acc[id], [`uk-UA`]: slug } };
    }
    if (locale === `en`) {
      return { ...acc, [id]: { ...acc[id], en: slug } };
    }
    return { ...acc, [id]: { ...acc[id], [`lt-LT`]: slug } };
  }, {});
};

module.exports = {
  getSlidingNavData,
  getPathByLocale,
  getHomePagePath,
  getOrganisationPagePath,
  getAllPagesLocalisedSlugs,
};
