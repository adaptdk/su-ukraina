import * as React from "react";
import PropTypes from "prop-types";

import "./FaqNav.css";
import Button from "../Button";

const FaqNav = ({ navData, pathname, lang }) => {
  let pathRoot = `/refugee-guide`;
  switch (lang) {
    case `lt`:
      pathRoot = `/informacija-ukrainieciams`;
      break;
    case `ua`:
      pathRoot = `/refugee-guide`;
      break;
    //...
  }

  return (
    <nav className="FaqNav">
      <ul className="FaqNav__list">
        {navData.map((navItem) => {
          return (
            <li className="FaqNav__list-item" key={navItem.slug}>
              <Button
                active={pathname.includes(navItem.slug)}
                color="primary"
                startIcon={navItem.icon}
                endIcon={`arrow-white`}
                to={`${pathRoot}${navItem.slug}/`}
              >
                {navItem.title_override}
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

FaqNav.propTypes = {
  navData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      title_override: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
  pathname: PropTypes.string,
  lang: PropTypes.string,
};

export default FaqNav;
