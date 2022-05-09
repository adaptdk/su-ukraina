import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { useLocation } from "@gatsbyjs/reach-router";

import { ADDITIONAL_NAVIGATION } from "../../constants/Navigation";

import "./AdditionalNavigation.css";

const AdditionalNavigation = () => {
  const { pathname } = useLocation();
  const additionalNavigationArray = ADDITIONAL_NAVIGATION[pathname];

  return (
    <>
      {additionalNavigationArray ? (
        <nav className="AdditionalNavigation">
          <ol className="AdditionalNavigation__container">
            {additionalNavigationArray.map((navigationItem, index) => {
              return (
                <li key={index}>
                  <Link
                    className="AdditionalNavigation__item"
                    to={navigationItem.pathname}
                  >
                    {navigationItem.title}
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>
      ) : null}
    </>
  );
};

AdditionalNavigation.propTypes = {
  additionalNav: PropTypes.arrayOf(PropTypes.string),
};

export default AdditionalNavigation;
