const path = require(`path`);

const contentModel = require(`../helpers/contentfulContentModel`);
const {
  getHomePagePath,
  getAllPagesLocalisedValuesByKey,
  getCurrentNodeValue,
} = require(`../helpers/hooks`);
const { logContentfulWarning } = require(`../helpers/utils`);

const homepageId = `VoE6QU1LhN2Y5h6Tja3fq`;

const query = (graphql) => {
  return graphql(`
  {
    ${contentModel.globalNavigation}
    ${contentModel.promoLine}
    allContentfulHomepage(filter: {contentful_id: { eq: "${homepageId}" }}) {
      edges {
        node {
          id
          contentful_id
          node_locale
          ${contentModel.seo}
          heroTitle
          heroDescription
          heroImage {
            gatsbyImageData(
              formats: WEBP
              height: 567
              width: 1440
              placeholder: BLURRED
              layout: FULL_WIDTH
            )
          }
          heroCtaCards {
            ... on ContentfulLinkIcon {
              id
              label
              url
              iconType
            }
          }
          modules {
            ... on Node {
              id
              internal {
                type
              }
              ... on ContentfulPartnersModule {
                ${contentModel.partnersModule}
              }
              ... on ContentfulFaqCategoriesModule {
                ${contentModel.faqCategoriesModule}
              }
              ... on ContentfulLinkCollectionModule {
                ${contentModel.linkCollectionModule}
              }
              ... on ContentfulPromotionBannerModule {
                ${contentModel.promotionBannerModule}
              }
            }
          }
        }
      }
    }
  }
`);
};

const createHomePages = (result, createPage) => {
  const homePages = result.data.allContentfulHomepage.edges.map(
    (edge) => edge.node
  );
  const globalNavigation = result.data.allContentfulNavigation.edges.map(
    (edge) => edge.node
  );
  const globalPromoLine = result.data.allContentfulPromoLineModule.edges.map(
    (edge) => edge.node
  );

  const allHeroImages = getAllPagesLocalisedValuesByKey(homePages, `heroImage`);

  homePages.forEach((homePage) => {
    const locale = homePage?.node_locale;

    if (homePage?.metaTitle && locale) {
      const navigation = globalNavigation
        .filter((item) => item.node_locale === locale)
        .shift();
      const promoLine = globalPromoLine
        .filter((item) => item.node_locale === locale)
        .shift();

      const currentHeroImage = getCurrentNodeValue(
        allHeroImages,
        homepageId,
        locale
      );
      const pagePath = getHomePagePath(locale);

      createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/homePage.jsx`),
        context: {
          ...homePage,
          heroImage: currentHeroImage,
          navigation,
          promoLine,
        },
      });
    } else {
      logContentfulWarning(`Home Page`, homepageId, locale);
    }
  });
};

module.exports = {
  query,
  createHomePages,
};
