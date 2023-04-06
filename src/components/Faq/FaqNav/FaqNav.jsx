import * as React from "react";
import PropTypes from "prop-types";

import "./FaqNav.css";
import Button from "../../Button";
import { FaqCategoriesPropType } from "../FaqPropTypes";

const FaqNav = ({ rootPath, categories, pathname }) => {
  if (!categories) {
    return null;
  }

  return (
    <nav className="FaqNav">
      <ul className="FaqNav__list">
        {categories?.at(0) &&
          categories.map((category) => {
            return (
              <li className="FaqNav__list-item" key={category.id}>
                <Button
                  active={pathname.includes(category.slug)}
                  color="primary"
                  startIcon={category.iconType}
                  endIcon={`arrow-white`}
                  to={`/${rootPath}${category.slug}/`}
                >
                  {category.pageHeading}
                </Button>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

FaqNav.propTypes = {
  rootPath: PropTypes.string.isRequired,
  categories: FaqCategoriesPropType.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default FaqNav;
