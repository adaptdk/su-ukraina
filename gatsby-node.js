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

  // Process Programs
  promises.push(
    processPage({
      pageQuery: PAGE_UTILS.helpPage.query(graphql),
      createFunction: PAGE_UTILS.helpPage.createHelpPages,
      createPage,
    })
  );

  return Promise.all(promises);
};
