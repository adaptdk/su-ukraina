const PAGE_UTILS = require(`./src/build-utils/pages`);

const processPage = ({ pageQuery, createFunction, createPage }) => {
  const promises = [];

  promises.push(
    new Promise((resolve, reject) => {
      pageQuery
        .then((result) => {
          createFunction(result, createPage);
          resolve();
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    })
  );

  return Promise.all(promises);
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const promises = [];

  // Process Home Pages
  promises.push(
    processPage({
      pageQuery: PAGE_UTILS.homePage.query(graphql),
      createFunction: PAGE_UTILS.homePage.createHomePages,
      createPage,
    })
  );

  // Process Help Pages
  promises.push(
    processPage({
      pageQuery: PAGE_UTILS.helpPage.query(graphql),
      createFunction: PAGE_UTILS.helpPage.createHelpPages,
      createPage,
    })
  );

  // Process Organisation Pages
  promises.push(
    processPage({
      pageQuery: PAGE_UTILS.organisationPage.query(graphql),
      createFunction: PAGE_UTILS.organisationPage.createOrganisationPages,
      createPage,
    })
  );

  // Process Modular Pages
  promises.push(
    processPage({
      pageQuery: PAGE_UTILS.modularPage.query(graphql),
      createFunction: PAGE_UTILS.modularPage.createModularPages,
      createPage,
    })
  );

  // Process FAQ Index Pages
  promises.push(
    processPage({
      pageQuery: PAGE_UTILS.faqIndexPage.query(graphql),
      createFunction: PAGE_UTILS.faqIndexPage.createFaqIndexPages,
      createPage,
    })
  );

  // Process FAQ Pages
  promises.push(
    processPage({
      pageQuery: PAGE_UTILS.faqPage.query(graphql),
      createFunction: PAGE_UTILS.faqPage.createFaqPages,
      createPage,
    })
  );

  return Promise.all(promises);
};

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  // https://stackoverflow.com/a/63128321/20346883
  if (stage === `develop` || stage === `build-javascript`) {
    const config = getConfig();
    const miniCssExtractPlugin = config.plugins.find(
      (plugin) => plugin.constructor.name === `MiniCssExtractPlugin`
    );
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true;
    }
    actions.replaceWebpackConfig(config);
  }
};
