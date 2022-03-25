import * as React from "react";
import PropTypes from "prop-types";
import { useLocation } from "@reach/router";

import "./FaqNav.css";
import Button from "../Button";

const FaqNav = ({ navData, modifier }) => {
  const modifierClass = modifier ? `FaqNav--${modifier}` : ``;
  const location = useLocation();
  const pathname = location.pathname;

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
                  text={navItem.title_override}
                  color="primary"
                  to={`/refugee-guide${navItem.slug}/`}
                />
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
  pagePath: PropTypes.string,
};

export default FaqNav;
