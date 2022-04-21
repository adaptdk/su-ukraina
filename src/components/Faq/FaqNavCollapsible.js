import * as React from "react";
import PropTypes from "prop-types";
import { useLocation } from "@gatsbyjs/reach-router";

import "./FaqNavCollapsible.css";
import Button from "../Button";
import FaqNav from "./FaqNav";

const FaqNavCollapsible = ({ navData, lang }) => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="FaqNavCollapsible">
      <FaqNav navData={navData} pathname={pathname} lang={lang} />
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
    </div>
  );
};

FaqNavCollapsible.propTypes = {
  navData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      title_override: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
  lang: PropTypes.string,
  pagePath: PropTypes.string,
};

export default FaqNavCollapsible;
