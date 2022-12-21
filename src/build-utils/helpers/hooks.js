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
    if (slug === `homepage`) {
      return `/`;
    }
    if (prefix?.lt) {
      return `${prefix.lt}/${slug}`;
    }
    return slug;
  }

  if (locale === `uk-UA`) {
    if (slug === `homepage`) {
      return `ua`;
    }
    if (prefix?.ua) {
      return `ua/${prefix.ua}/${slug}`;
    }
    return `ua/${slug}`;
  }

  if (locale === `en`) {
    if (slug === `homepage`) {
      return `en`;
    }
    if (prefix?.en) {
      return `en/${prefix.en}/${slug}`;
    }
    return `en/${slug}`;
  }

  // This will break the build and we want that
  return null;
};

/**
 * Returns all faq pages data required for FaqNav by locale.
 * @param {Array} faqPages Array of FAQ pages, typically queried by GraphQL.
 * @param {String} locale String locale, eg.: "lt-LT". Also queried by GraphQL, usually named "node_locale".
 * @returns {Array} Returns an array of objects with necessary data for the FaqNav.
 */
const getFaqNavDataByLocale = (faqPages, locale) => {
  return faqPages
    .filter((page) => {
      return page.node_locale === locale;
    })
    .map(({ id, pageHeading, slug, iconType }) => {
      return {
        id,
        pageHeading,
        slug,
        iconType,
      };
    });
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

module.exports = {
  getSlidingNavData,
  getPathByLocale,
  getFaqNavDataByLocale,
  getOrganisationPagePath,
};
