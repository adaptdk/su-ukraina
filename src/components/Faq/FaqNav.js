import * as React from "react";
import PropTypes from "prop-types";

import "./FaqNav.css";
import Button from "../Button";

const FaqNav = ({ navData, modifier, pathname }) => {
  const modifierClass = modifier ? `FaqNav--${modifier}` : ``;

  return (
    <div className={`FaqNav ${modifierClass}`}>
      <nav>
        <ul>
          {navData.map((navItem) => {
            const activeClass = pathname.includes(navItem.slug)
              ? `is-active`
              : ``;

            return (
              <li className={activeClass} key={navItem.slug}>
                <Button
                  color="primary"
                  icon={`arrow-white`}
                  to={`/refugee-guide${navItem.slug}/`}
                >
                  {navItem.title_override}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

FaqNav.propTypes = {
  modifier: PropTypes.string,
  navData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      title_override: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
  pathname: PropTypes.string,
};

export default FaqNav;
