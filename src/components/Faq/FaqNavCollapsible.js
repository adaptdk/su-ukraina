import * as React from "react";
import PropTypes from "prop-types";
import { useLocation } from "@reach/router";

import "./FaqNavCollapsible.css";
import Button from "../Button";

// @TODO Refactor to use <FaqNav />
const FaqNavCollapsible = ({ navData, modifier }) => {
  const modifierClass = modifier ? `FaqNavCollapsible--${modifier}` : ``;
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className={`FaqNavCollapsible ${modifierClass}`}>
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
        <div className="FaqNavCollapsible__actions">
          <label
            className="FaqNavCollapsible__close-trigger"
            htmlFor="faqnav-sensor"
          >
            <Button
              className="FaqNavCollapsible__close-trigger-button"
              color="primary"
              pretend
            >
              Закрити
            </Button>
          </label>
        </div>
      </nav>
    </div>
  );
};

FaqNavCollapsible.propTypes = {
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

export default FaqNavCollapsible;
