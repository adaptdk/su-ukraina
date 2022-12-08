import * as React from "react";
import PropTypes from "prop-types";

import "./FaqNav.css";
import Button from "../Button";

const FaqNav = ({ pages, pathname }) => {
  if (!pages) {
    return null;
  }

  let pathRoot = `/ua/refugee-guide`;

  switch (true) {
    case pathname.includes(`/informacija-ukrainieciams`):
      pathRoot = `/informacija-ukrainieciams`;
      break;
    case pathname.includes(`/ua/refugee-guide`):
      pathRoot = `/ua/refugee-guide`;
      break;
    case pathname.includes(`/informacija-lietuviams`):
      pathRoot = `/informacija-lietuviams`;
      break;
    default:
      break;
  }

  return (
    <nav className="FaqNav">
      <ul className="FaqNav__list">
        {pages.map((page) => {
          return (
            <li className="FaqNav__list-item" key={page.id}>
              <Button
                active={pathname.includes(page.slug)}
                color="primary"
                startIcon={page.iconType}
                endIcon={`arrow-white`}
                to={`${pathRoot}/${page.slug}/`}
              >
                {page.pageHeading}
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

FaqNav.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      pageHeading: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      iconType: PropTypes.string.isRequired,
    })
  ),
  pathname: PropTypes.string,
  lang: PropTypes.string,
};

export default FaqNav;
