const slugify = require(`slugify`);

/**
 * @typedef {"lt-LT" | "uk-UA" | "en"} LocaleType
 */

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
 * @param {LocaleType} locale Locale queried from GraphQL, eg: `"lt-LT"`.
 * @param {String} slug Slug queried from GraphQL without trailing slashes.
 * @param {lt: String, ua: String, en: String} prefix Optional prefix object for generating page/subpage. No trailing slashes
 * @returns Returns full `path`, eg: `"ua/privacy-policy"`
 */
const getPathByLocale = (
  locale,
  slug,
  prefix = { [`lt-LT`]: ``, [`uk-UA`]: ``, en: `` }
) => {
  if (locale === `lt-LT`) {
    if (prefix[locale]) {
      return `${prefix[locale]}/${slug}`;
    }
    return slug;
  }

  if (locale === `uk-UA`) {
    if (prefix[locale]) {
      return `ua/${prefix[locale]}/${slug}`;
    }
    return `ua/${slug}`;
  }

  if (locale === `en`) {
    if (prefix[locale]) {
      return `en/${prefix[locale]}/${slug}`;
    }
    return `en/${slug}`;
  }

  // This will break the build and we want that
  return null;
};

/**
 * Generates pathname for homepage and it's locales.
 *
 * @param {LocaleType} locale
 * @returns {string} Generated pathname to pass into the `createPage` function.
 */
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
 * @param {LocaleType} locale
 * @param {"Donation" | "Volunteering"} type Organisation type.
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

  // @todo: use HELP_PAGE_PREFIXES here somehow
  const ltPrefix = type === `Donation` ? `aukojimas` : `savanoryste`;
  const uaPrefix = type === `Donation` ? `pozhertvuvannya` : `volonterstvo`;
  const enPrefix = type === `Donation` ? `donation` : `volunteering`;

  return getPathByLocale(locale, slug, {
    lt: `kaip-galiu-padeti/${ltPrefix}`,
    ua: `dopomoha/${uaPrefix}`,
    en: `help/${enPrefix}`,
  });
};

/**
 * Get all of the pages' localised values by key.
 *
 * This function is a helper for things like getting all of the pages' slugs
 * or all of the pages' hero images.
 * The `searchKey` would be something that the pages would have in the top level,
 * like `slug`, `heroImage`, `metaTitle` etc.
 *
 * @param {Array} pages All pages queried from Contentful.
 * @param {string} searchKey String of what key to search for.
 * @returns {Object} Object where each item's key is the `contentful_id` and the value is an object of mapped values by locale.
 */
const getAllPagesLocalisedValuesByKey = (pages, searchKey) => {
  return pages.reduce((acc, curr) => {
    const id = curr.contentful_id;
    const locale = curr.node_locale;
    const searchValue = curr[searchKey];

    return { ...acc, [id]: { ...acc[id], [locale]: searchValue } };
  }, {});
};

/**
 * Gets the current locale's hero image or it's fallback.
 *
 * @param {object} allHeroImages All hero images from the `getAllPagesLocalisedValuesByKey` hook
 * @param {string} id Contentful node's ID.
 * @param {LocaleType} locale
 * @returns {object} Hero Image
 */
const getCurrentHeroImage = (allHeroImages, id, locale) => {
  const currentNodeImages = allHeroImages[id];
  return currentNodeImages[locale] || currentNodeImages[`lt-LT`] || null;
};

module.exports = {
  getSlidingNavData,
  getPathByLocale,
  getHomePagePath,
  getOrganisationPagePath,
  getAllPagesLocalisedValuesByKey,
  getCurrentHeroImage,
};
