import * as React from "react";
import PropTypes from "prop-types";

import "./FaqNav.css";

const FaqNav = ({ navData, modifier }) => {
  const modifierClass = modifier ? `FaqNav--${modifier}` : ``;

  return (
    <div className={`FaqNav ${modifierClass}`}>
      <nav>
        <ul>
          {navData.map((navItem, i) => {
            return (
              <li>
                <a href={navItem.slug}>{navItem.title_override}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
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
  pagePath: PropTypes.string,
};

export default FaqNav;
