/**
 * @see https://stackoverflow.com/a/54346068
 */

let fieldsToRemove = [];

const deleteFieldsRecursive = (node) => {
  if (!node) {
    return;
  }

  fieldsToRemove.forEach((fieldToRemove) => {
    if (node[fieldToRemove] === ``) {
      delete node[fieldToRemove];
    }
  });

  if (typeof node === `object`) {
    Object.values(node).forEach((subNode) => {
      deleteFieldsRecursive(subNode);
    });
  }
};

exports.onCreateNode = ({ node }, configOptions) => {
  fieldsToRemove = configOptions.fieldsToRemove;

  if (node.internal.type === `MarkdownRemark`) {
    if (!node.frontmatter) {
      return;
    }

    deleteFieldsRecursive(node);
  }
};
